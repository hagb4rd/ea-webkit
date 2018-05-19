function sqlEscape( value ) {
                return value.replace(/'/g,'\\\'');
}

function DB(host,user,password) {
                this.pool  = mysql.createPool({host:'localhost',user:'master',password:'likeidjustsay'});
        };
		
 MySql.prototype.updateUser = function(params) {
        this.pool.getConnection( (err,connection) => {
                        if(err) {
                                console.log('Failed to get database connection: ' + err);
                                throw err;
                        }
 
                        // User exists?
                        var sql = "SELECT * FROM HyperConversal.Users WHERE email = '" + sqlEscape(params.email) + "' ";
                        connection.query(sql, null, function(err,rows) {
                                console.log('Users: ' + JSON.stringify( rows ) );
                                connection.release();
                        });
                });
        },
 
        
};

module.exports = DB;