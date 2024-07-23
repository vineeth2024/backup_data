const sql = require('mysql2');

const con = sql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Vineeth@2024',
        database: 'vineethdb'
    }
)

function getMobiles(id){
    return new Promise(function(success,reject){
        if(id){
            con.query(`SELECT * FROM book WHERE id=?`,[id],function(err,rows,col){
                if(err){
                    reject(500)
                }
                else{
                    success(rows)
                }
            })
        }
        else{
            con.query(`SELECT * FROM book`,function(err,rows){
                if(err){
                    reject(500)
                }
                else{
                    success(rows)
                    
                }
            })
        }
    })
}

function addMobile(id,n,p,r,s){
    return new Promise(function(success,reject){
    con.query(`INSERT INTO book (id,name,price,ram,storage) VALUES(?,?,?,?,?)`,[id,n,p,r,s],
        function(err,rows){
            if(err){
                reject(500)
            }
            else{
                success(rows)
            }
        }
    )
})
}
function updateMobile(n,p,r,s,id){
    return new Promise(function(success,reject){
    con.query(`UPDATE book SET name=?,price=?,ram=?,storage=? WHERE id=?`,[n,p,r,s,id],
        function(err,rows){
            if(err){
                reject(500)
            }
            else{
                success(rows)
            }
        }
    )
})
}
function deleteMobile(id){
    return new Promise(function(success,reject){
        getMobiles(id)
        .then((rows)=>{
            if(rows.length>0){
                con.query(`DELETE FROM book WHERE id=?`,[id],
                    function(err,rows){
                        if(err){
                            reject(500)
                        }
                        else{
                            success(rows)
                        }
                    }
                )
            }
            else{
                reject(404)
            }
        })
})
}

module.exports ={
    addMobile,getMobiles,updateMobile,deleteMobile
}

