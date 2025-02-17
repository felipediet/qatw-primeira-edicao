import pgPromise from 'pg-promise';	// pg-promise core library

// Database connection details;
const pgp = pgPromise();
const db = pgp('postgresql://dba:dba@paybank-db:5432/UserDB');

export async function obterCodigo2FA(cpf) {
    const query = `SELECT code
	                FROM public."TwoFactorCode" t
	                JOIN public."User" u ON u."id" = t."userId"
	                where t."isUsed" = false and u."cpf" = '${cpf}'
	                order by t."id" desc
	                LIMIT 1
                `;

    const result = await db.oneOrNone(query);
    return result.code;
}
