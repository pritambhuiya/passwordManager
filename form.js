class Form {
  #index;
  constructor(...fields) {
    this.fields = fields;
    this.#index = 0;
    this.currentField = fields[this.#index];
  }

  nextField() {
    if (this.currentField.isFilled()) {
      this.#index++;
    }
    this.currentField = this.fields[this.#index];
  }

  isFilled() {
    return this.fields.every(field => field.isFilled());
  }

  currentQuestion() {
    return this.currentField.getMsg();
  }

  fillCurrentField(reply) {
    if (this.currentField.validator(reply)) {
      this.currentField.fill(this.currentField.parser(reply));
      this.nextField();
      return;
    }
    throw new Error('Invalid input');
  }

  getAnswers() {
    const replies = {};
    this.fields.forEach(field => {
      replies[field.key] = field.getReply();
    });
    return replies;
  }
}

exports.Form = Form;