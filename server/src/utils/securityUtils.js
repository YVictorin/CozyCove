import crypto from "crypto";

export function hashPassword(password, salt) {
    return new Promise((resolve, reject) => {
        //a newer built into node.js authentication hasher for passwords
        crypto.scrypt(password.normalize(), salt, 64, (err, hash) => {
            if(err) {
                reject(err);
            }
        
            resolve(hash.toString("hex").normalize());   
        })
    })
}

export async function comparePasswords({ password, salt, hashedPassword }) {
    const inputHashedPassword = await hashPassword(password, salt)

    //stop timing problem issues, from how more equals or less equals the passwords are to each other
    return crypto.timingSafeEqual(                   //always takes the same amount of time to stop timing attacks
        Buffer.from(inputHashedPassword, "hex"),
        Buffer.from(hashedPassword, "hex"),
    ) 
}

export function generateSalt() {
    return crypto.randomBytes(16).toString("hex").normalize();
}