const { createHash } = require('crypto');
const { readFileSync, writeFileSync } = require('fs');
const { stdin, stdout } = process;
const { Field } = require('./field.js');
const { Form: Login } = require('./form.js');

const validatePassword = password => password.length > 7;
const isNotEmpty = text => text !== '';

const addSalt = text => text + 'sALT';

const getDigest = text => {
  const sha256 = createHash('sha256');
  sha256.update(addSalt(text));
  return sha256.digest('hex');
};

const writeInJSON = ({ username, password }) => {
  let content = readFileSync('details.json', 'utf-8');
  content = JSON.parse(content);
  content[username] = password;
  writeFileSync('details.json', JSON.stringify(content), 'utf-8');
};

const getFields = () => {
  const fields = [
    new Field('username', 'Please enter your username:', isNotEmpty,),
    new Field('password', 'Please enter your password:', validatePassword, getDigest),
  ];
  return fields;
};

const fillField = (login, reply, logger, writer) => {
  try {
    login.fillCurrentField(reply);
  } catch (error) {
    logger(error.message);
  }
  if (login.isFilled()) {
    const answers = login.getAnswers();
    writeInJSON(answers);
    stdin.destroy();
    return;
  }
  logger(login.currentQuestion());
};

const main = () => {
  const login = new Login(...getFields());
  console.log(login.currentQuestion());
  stdin.setEncoding('utf-8');
  stdin.on('data', (chunk) => {
    fillField(login, chunk.trim(), console.log, writeFileSync);
  })
}

main();