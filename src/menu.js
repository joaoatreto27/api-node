"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = __importDefault(require("readline"));
const UserModel_1 = __importDefault(require("./models/UserModel"));
function showAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield UserModel_1.default.find({});
            console.log('Usuários cadastrados:');
            users.forEach((user, index) => {
                console.log(`Usuário ${index + 1}:`);
                console.log(`ID: ${user._id}`);
                console.log(`Nome: ${user.nome}`);
                console.log(`Email: ${user.email}`);
                console.log(`Idade: ${user.idade}`);
                console.log(`Gênero: ${user.genero}`);
                console.log(`Telefone: ${user.telefone}`);
                console.log(`CPF: ${user.cpf}`);
                console.log(`RG: ${user.rg}`);
                console.log('------------------------');
            });
        }
        catch (error) {
            console.error('Erro ao buscar usuários:', error);
        }
    });
}
function insertNewUser(rl) {
    return __awaiter(this, void 0, void 0, function* () {
        let nome;
        let email;
        let idade;
        let genero;
        let telefone;
        let cpf;
        let rg;
        try {
            while (!nome) {
                nome = yield askQuestion(rl, 'Digite o nome: ');
            }
            while (!email || !validateEmail(email)) {
                email = yield askQuestion(rl, 'Digite o email: ');
            }
            while (!idade) {
                idade = yield askQuestion(rl, 'Digite a idade: ');
            }
            while (!genero) {
                genero = yield askQuestion(rl, 'Digite o gênero: ');
            }
            while (!telefone) {
                telefone = yield askQuestion(rl, 'Digite o telefone: ');
            }
            while (!cpf) {
                cpf = yield askQuestion(rl, 'Digite o CPF: ');
            }
            while (!rg) {
                rg = yield askQuestion(rl, 'Digite o RG: ');
            }
            const userData = {
                nome,
                email,
                idade: parseInt(idade),
                genero,
                telefone,
                cpf,
                rg
            };
            const newUser = yield UserModel_1.default.create(userData);
            console.log('Novo usuário criado:', newUser);
            rl.close();
        }
        catch (error) {
            console.error(error.message);
            insertNewUser(rl);
        }
    });
}
function askQuestion(rl, question) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            rl.question(question, (answer) => {
                resolve(answer.trim());
            });
        });
    });
}
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function findUserById(rl) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            rl.question('Digite o ID do usuário: ', (id) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const user = yield UserModel_1.default.findById(id);
                    if (user) {
                        console.log('Usuário encontrado:');
                        console.log(`ID: ${user._id}`);
                        console.log(`Nome: ${user.nome}`);
                        console.log(`Email: ${user.email}`);
                        console.log(`Idade: ${user.idade}`);
                        console.log(`Gênero: ${user.genero}`);
                        console.log(`Telefone: ${user.telefone}`);
                        console.log(`CPF: ${user.cpf}`);
                        console.log(`RG: ${user.rg}`);
                    }
                    else {
                        console.log('Nenhum usuário encontrado com o ID fornecido.');
                    }
                }
                catch (error) {
                    console.error('Erro ao buscar usuário:', error);
                }
                rl.close();
            }));
        }
        catch (error) {
            console.error('Erro ao buscar usuário:', error);
            rl.close();
        }
    });
}
function updateUserById(rl) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            rl.question('Digite o ID do usuário que deseja atualizar: ', (id) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const user = yield UserModel_1.default.findById(id);
                    if (user) {
                        console.log('Usuário encontrado:');
                        console.log(`ID: ${user._id}`);
                        console.log(`Nome: ${user.nome}`);
                        console.log(`Email: ${user.email}`);
                        console.log(`Idade: ${user.idade}`);
                        console.log(`Gênero: ${user.genero}`);
                        console.log(`Telefone: ${user.telefone}`);
                        console.log(`CPF: ${user.cpf}`);
                        console.log(`RG: ${user.rg}`);
                        rl.question('Digite o novo nome: ', (nome) => __awaiter(this, void 0, void 0, function* () {
                            rl.question('Digite o novo email: ', (email) => __awaiter(this, void 0, void 0, function* () {
                                rl.question('Digite a nova idade: ', (idade) => __awaiter(this, void 0, void 0, function* () {
                                    rl.question('Digite o novo gênero: ', (genero) => __awaiter(this, void 0, void 0, function* () {
                                        rl.question('Digite o novo telefone: ', (telefone) => __awaiter(this, void 0, void 0, function* () {
                                            rl.question('Digite o novo CPF: ', (cpf) => __awaiter(this, void 0, void 0, function* () {
                                                rl.question('Digite o novo RG: ', (rg) => __awaiter(this, void 0, void 0, function* () {
                                                    user.nome = nome;
                                                    user.email = email;
                                                    user.idade = parseInt(idade);
                                                    user.genero = genero;
                                                    user.telefone = telefone;
                                                    user.cpf = cpf;
                                                    user.rg = rg;
                                                    yield user.save();
                                                    console.log('Usuário atualizado com sucesso.');
                                                    rl.close();
                                                }));
                                            }));
                                        }));
                                    }));
                                }));
                            }));
                        }));
                    }
                    else {
                        console.log('Nenhum usuário encontrado com o ID fornecido.');
                        rl.close();
                    }
                }
                catch (error) {
                    console.error('Erro ao buscar usuário:', error);
                    rl.close();
                }
            }));
        }
        catch (error) {
            console.error('Erro ao buscar usuário:', error);
            rl.close();
        }
    });
}
function deleteUserById(rl) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            rl.question('Digite o ID do usuário que deseja excluir: ', (id) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const result = yield UserModel_1.default.deleteOne({ _id: id });
                    if (result.deletedCount && result.deletedCount > 0) {
                        console.log('Usuário excluído com sucesso.');
                    }
                    else {
                        console.log('Nenhum usuário encontrado com o ID fornecido.');
                    }
                }
                catch (error) {
                    console.error('Erro ao excluir usuário:', error);
                }
                rl.close();
            }));
        }
        catch (error) {
            console.error('Erro ao buscar usuário:', error);
            rl.close();
        }
    });
}
function showMenu() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const rl = readline_1.default.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            console.log('Menu:');
            console.log('1. Mostrar todos os usuários');
            console.log('2. Cadastrar novo usuário');
            console.log('3. Procurar usuário por ID');
            console.log('4. Atualizar dados de usuário por ID');
            console.log('5. Excluir usuário por ID');
            rl.question('Escolha uma opção: ', (option) => __awaiter(this, void 0, void 0, function* () {
                switch (option) {
                    case '1':
                        yield showAllUsers();
                        break;
                    case '2':
                        yield insertNewUser(rl);
                        break;
                    case '3':
                        yield findUserById(rl);
                        break;
                    case '4':
                        yield updateUserById(rl);
                        break;
                    case '5':
                        yield deleteUserById(rl);
                        break;
                    default:
                        console.log('Opção inválida');
                }
            }));
        }
        catch (error) {
            console.error('Erro ao exibir menu:', error);
        }
    });
}
showMenu();
