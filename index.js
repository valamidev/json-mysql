class JSONtoMysql {
  constructor(name, json) {
    this.json = json;
    this.name = name;
    this.structure = [];
    this.query = "";

    for (var i in this.json) {
      if (this.isArray(this.json[i])) {
        throw "Multi Array JSON, serialize your JSON";
      } else {
        // Do another thing
      }
    }

    this.structure_explore(this.json);

    this.structure_build();
  }

  structure_explore(json) {
    let i = 0;
    for (let key in json) {
      this.structure[i] = {};

      var value = json[key];
      this.structure[i].name = key;
      var type = typeof value;

      switch (type) {
        case "string":
          this.structure[i] = this.extend(
            this.structure[i],
            this.string_type(value)
          );
          break;
        case "number":
          this.structure[i] = this.extend(
            this.structure[i],
            this.number_type(value)
          );
          break;
        default:
          this.structure[i].type = "INT";
          this.structure[i].length = 10;
          this.structure[i].default = "DEFAULT NULL";
          break;
      }

      i++;
    }
  }

  structure_build() {
    this.query += "CREATE TABLE IF NOT EXISTS `" + this.name + "` ( \n";

    this.structure.forEach((element, index, array) => {
      if (element.length > 0) {
        element.type = element.type + " (" + element.length + ") ";
      }

      if (index === array.length - 1) {
        // Last element
        this.query +=
          "`" +
          element.name +
          "` " +
          element.type +
          " " +
          element.default +
          " \n";
      } else {
        this.query +=
          "`" +
          element.name +
          "` " +
          element.type +
          " " +
          element.default +
          ", \n";
      }
    });

    this.query += ") ENGINE=INNODB DEFAULT CHARSET=utf8mb4; \n";

    return this.query;
  }

  string_type(string) {
    let field = {};

    // String check to possible float
    if (this.string_isnumber(string)) {
      return this.number_type(string);
    }

    if (string.length > 255) {
      field.type = "TEXT";
      field.length = 0;
      field.default = "DEFAULT NULL";
    } else {
      field.type = "VARCHAR";
      field.length = 255;
      field.default = "DEFAULT NULL";
    }

    return field;
  }

  number_type(number) {
    let field = {};

    if (number % 1 === 0) {
      if (number > 4294967295) {
        field.type = "BIGINT";
        field.length = 20;
        field.default = "DEFAULT NULL";
      } else {
        field.type = "INT";
        field.length = 10;
        field.default = "DEFAULT NULL";
      }
    } else {
      field.type = "DOUBLE";
      field.default = "DEFAULT NULL";
      field.length = 0;
    }

    return field;
  }

  string_isnumber(string) {
    if (!isNaN(string) && string.toString().indexOf(".") != -1) {
      return true;
    }

    if (!isNaN(string) && string.toString().indexOf(".") == -1) {
      return true;
    }

    return false;
  }

  isArray(what) {
    return Object.prototype.toString.call(what) === "[object Array]";
  }

  extend(obj, src) {
    Object.keys(src).forEach(function(key) {
      obj[key] = src[key];
    });
    return obj;
  }
}

module.exports = JSONtoMysql;
