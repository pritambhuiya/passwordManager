class Field {
  constructor(key, msg, validator = () => true, parser = x => x) {
    this.key = key;
    this.msg = msg;
    this.validator = validator;
    this.parser = parser;
    this.reply = null;
  }

  fill(reply) {
    this.reply = reply;
  }

  getMsg() {
    return this.msg;
  }

  isFilled() {
    return this.reply !== null;
  }

  getReply() {
    return this.reply;
  }
}

exports.Field = Field;