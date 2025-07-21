const mysqldump = require('mysqldump');

// dump the result straight to a file
const mysqlbackup = () => {
    try {
        mysqldump({
            connection: {
                host: "localhost",
                user: "sgsro_user",
                password: "MShIx5o06_",
                database: "admin_sgsro",
            },
            dumpToFile: `./mysqlbackup/dump${new Date().toISOString().replace(/:/g, '-')}.sql`,
        });

        mysqldump({
            connection: {
                host: "localhost",
                user: "root",
                password: "root",
                database: "sgsro",
            },
            dumpToFile: `./mysqlbackup/sgsro${new Date().toISOString().substring(0, 10).replace(/:/g, '-')}.sql`,
        });

        // dump the result straight to a compressed file
        // mysqldump({
        //     connection: {
        //         host: "localhost",
        //         user: "root",
        //         password: "root",
        //         database: "ecom",
        //     },
        //     dumpToFile: `./mysqlbackup/dump${new Date().toISOString().substring(0, 10).replace(/:/g, '-')}.sql.gz`,
        //     compressFile: true,
        // });
    } catch (err) { }

}

module.exports = mysqlbackup;