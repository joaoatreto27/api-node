import readline from 'readline';
import { connectDB } from './database';
import UserModel, { User } from './models/UserModel';

async function showAllUsers() {
    try {
        const users: User[] = await UserModel.find({});
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
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
    }
}

async function insertNewUser(rl: readline.Interface) {
    let nome: string | undefined;
    let email: string | undefined;
    let idade: string | undefined;
    let genero: string | undefined;
    let telefone: string | undefined;
    let cpf: string | undefined;
    let rg: string | undefined;

    try {
        while (!nome) {
            nome = await askQuestion(rl, 'Digite o nome: ');
        }

        while (!email || !validateEmail(email)) {
            email = await askQuestion(rl, 'Digite o email: ');
        }

        while (!idade) {
            idade = await askQuestion(rl, 'Digite a idade: ');
        }

        while (!genero) {
            genero = await askQuestion(rl, 'Digite o gênero: ');
        }

        while (!telefone) {
            telefone = await askQuestion(rl, 'Digite o telefone: ');
        }

        while (!cpf) {
            cpf = await askQuestion(rl, 'Digite o CPF: ');
        }

        while (!rg) {
            rg = await askQuestion(rl, 'Digite o RG: ');
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

        const newUser = await UserModel.create(userData);
        console.log('Novo usuário criado:', newUser);
        rl.close();
    } catch (error) {
        console.error((error as Error).message);
        insertNewUser(rl);
    }
}

async function askQuestion(rl: readline.Interface, question: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer.trim());
        });
    });
}

function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

async function findUserById(rl: readline.Interface) {
    try {
        rl.question('Digite o ID do usuário: ', async (id) => {
            try {
                const user = await UserModel.findById(id);
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
                } else {
                    console.log('Nenhum usuário encontrado com o ID fornecido.');
                }
            } catch (error) {
                console.error('Erro ao buscar usuário:', error);
            }

            rl.close();
        });
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        rl.close();
    }
}

async function updateUserById(rl: readline.Interface) {
    try {
        rl.question('Digite o ID do usuário que deseja atualizar: ', async (id) => {
            try {
                const user = await UserModel.findById(id);
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

                    rl.question('Digite o novo nome: ', async (nome) => {
                        rl.question('Digite o novo email: ', async (email) => {
                            rl.question('Digite a nova idade: ', async (idade) => {
                                rl.question('Digite o novo gênero: ', async (genero) => {
                                    rl.question('Digite o novo telefone: ', async (telefone) => {
                                        rl.question('Digite o novo CPF: ', async (cpf) => {
                                            rl.question('Digite o novo RG: ', async (rg) => {
                                                user.nome = nome;
                                                user.email = email;
                                                user.idade = parseInt(idade);
                                                user.genero = genero;
                                                user.telefone = telefone;
                                                user.cpf = cpf;
                                                user.rg = rg;
                                                await user.save();

                                                console.log('Usuário atualizado com sucesso.');

                                                rl.close();
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                } else {
                    console.log('Nenhum usuário encontrado com o ID fornecido.');
                    rl.close();
                }
            } catch (error) {
                console.error('Erro ao buscar usuário:', error);
                rl.close();
            }
        });
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        rl.close();
    }
}

async function deleteUserById(rl: readline.Interface) {
    try {
        rl.question('Digite o ID do usuário que deseja excluir: ', async (id) => {
            try {
                const result = await UserModel.deleteOne({ _id: id });
                if (result.deletedCount && result.deletedCount > 0) {
                    console.log('Usuário excluído com sucesso.');
                } else {
                    console.log('Nenhum usuário encontrado com o ID fornecido.');
                }
            } catch (error) {
                console.error('Erro ao excluir usuário:', error);
            }

            rl.close();
        });
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        rl.close();
    }
}


async function showMenu() {
    try {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        console.log('Menu:');
        console.log('1. Mostrar todos os usuários');
        console.log('2. Cadastrar novo usuário');
        console.log('3. Procurar usuário por ID');
        console.log('4. Atualizar dados de usuário por ID');
        console.log('5. Excluir usuário por ID');

        rl.question('Escolha uma opção: ', async (option) => {
            switch (option) {
                case '1':
                    await showAllUsers();
                    break;
                case '2':
                    await insertNewUser(rl);
                    break;
                case '3':
                    await findUserById(rl);
                    break;
                case '4':
                    await updateUserById(rl);
                    break;
                case '5':
                    await deleteUserById(rl);
                    break;
                default:
                    console.log('Opção inválida');
            }
        });
    } catch (error) {
        console.error('Erro ao exibir menu:', error);
    }
}

showMenu();