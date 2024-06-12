import db from "./SQLiteDatabase";

/**
 * INICIALIZAÇÃO DA TABELA
 * - Executa sempre, mas só cria a tabela caso não exista (primeira execução)
 */
db.transaction((tx) => {
  //<<<<<<<<<<<<<<<<<<<<<<<< USE ISSO APENAS DURANTE OS TESTES!!! >>>>>>>>>>>>>>>>>>>>>>>
// tx.executeSql("DROP TABLE tbuser;");
 //<<<<<<<<<<<<<<<<<<<<<<<< USE ISSO APENAS DURANTE OS TESTES!!! >>>>>>>>>>>>>>>>>>>>>>>
   tx.executeSql(
    "CREATE TABLE IF NOT EXISTS tbuser(id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT NOT NULL, email TEXT NOT NULL UNIQUE, senha TEXT NOT NULL, telefone INT NOT NULL);",
  );
   tx.executeSql(
    "CREATE TABLE IF NOT EXISTS tbconta(id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT NOT NULL, saldo INT NOT NULL, idUser INTEGER REFERENCES tbuser(id);"
    //  'CREATE TABLE IF NOT EXISTS tbconta('+
    //  'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
    //  'nome TEXT NOT NULL,' +
    //  'saldo INT NOT NULL,' +
    //  'idUser INTEGER REFERENCES tbuser(id),'+');'
 );
   tx.executeSql(
     'CREATE TABLE IF NOT EXISTS tbdespesa('+
     'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
     'desc TEXT,' +
     'valor FLOAT NOT NULL,' +
     'data DATE NOT NULL,' +
     'idConta INTEGER REFERENCES tbconta(id)'+');'

 );

});

export const createConta = (obj) => {
  console.log(obj.idUser+" cuzinho");
    return new Promise((resolve, reject) => {
      db.transaction((tx)=> {
        tx.executeSql(
          "INSERT INTO tbconta(nome, saldo, idUser) values (?, ?, ?);",
          ["Conta Inicial", obj.saldo, obj.idUser],
  
          (_, { rowsAffected, insertId }) => {
            if (rowsAffected > 0) resolve(insertId), console.log("conta criada");
            else reject("Error inserting obj: " + JSON.stringify(obj)); // insert falhou
          },
          (_, error) => reject(error) // erro interno em tx.executeSql
        );
      });
    });
  };

export const create = (obj) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        
        "INSERT INTO tbuser (nome, email, senha, telefone) values (?, ?, ?, ?);",
        [obj.nome, obj.email, obj.senha, obj.telefone],
        //-----------------------função de callback

        (_, { rowsAffected, insertId }) => {
          if (rowsAffected > 0) resolve(insertId), console.log("inseriu");
          else reject("Error inserting obj: " + JSON.stringify(obj)); // insert falhou
        },
        (_, error) => reject(error) // erro interno em tx.executeSql
      ); 
    });
  });
};


export const all = async() => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "SELECT * FROM tbuser;",
        [],

        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error) // erro interno em tx.executeSql
      );
      
    });
  });
};

export const selectById = async(id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM tbuser WHERE id = ?;",
        [id],
        (_, { rows }) => resolve(rows.item(0)),//pego uma linha so cuzao
        (_, error) => reject(error) //erro interno em tx.executeSql
      );
    })
  });
};

export const verificaDados = async(email, senha) => {
  return new Promise((resolve, reject)=> {
    db.transaction((tx)=> {
      tx.executeSql(
        "SELECT * FROM tbuser WHERE email = ? AND senha = ?",
        [email, senha],

        (_, { rows }) => resolve(rows.item(0)),//pego uma linha so cuzao
        (_, error) => reject(error) //erro interno em tx.executeSql

      );
    })
  })
}


