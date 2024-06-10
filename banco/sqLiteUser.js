import db from "./SQLiteDatabase";

/**
 * INICIALIZAÇÃO DA TABELA
 * - Executa sempre, mas só cria a tabela caso não exista (primeira execução)
 */
db.transaction((tx) => {
  //<<<<<<<<<<<<<<<<<<<<<<<< USE ISSO APENAS DURANTE OS TESTES!!! >>>>>>>>>>>>>>>>>>>>>>>
//tx.executeSql("DROP TABLE User;");
 //<<<<<<<<<<<<<<<<<<<<<<<< USE ISSO APENAS DURANTE OS TESTES!!! >>>>>>>>>>>>>>>>>>>>>>>
tx.executeSql(
    "CREATE TABLE IF NOT EXISTS tbuser(id INT PRIMARY KEY AUTOINCREMENT, nome TEXT NOT NULL, email TEXT NOT NULL, senha TEXT NOT NULL, telefone INT NOT NULL);"
);

});

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


