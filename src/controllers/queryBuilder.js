import dayjs from "dayjs";
export default function queryBuilder({ offset='', limit='', orderBy='', orderType='', status='', startDate='', customerId='', gameId='', cpf='' }){ 
    if (offset) {
        offset = `OFFSET ${offset}`;
    }
    
    if (limit) {
        limit = `LIMIT ${limit}`;
    }
    
    if (orderType) {
        orderType = 'DESC';
    }
    
    
    if (orderBy) {
        orderBy = `ORDER BY ${orderBy} ${orderType}`
    }

    let whereString = "";

    if (status) {
        if (status === 'open'){
            status = `"returnDate" IS null`
        }else{
            status = `"returnDate" IS NOT null`
        }

        if (whereString) {
            whereString += ` AND ${status}`
        }else{
            whereString += `WHERE ${status} `
        }
    }

    if (startDate) {
        startDate = `"rentDate" >= date '${dayjs(startDate).format("YYYY-MM-DD")}'`

        if (whereString) {
            whereString += ` AND ${startDate}`
        }else{
            whereString += `WHERE ${startDate} `
        }
    }

    if (customerId) {
        customerId = `"customerId" = ${customerId}`

        if (whereString) {
            whereString += ` AND ${customerId}`
        }else{
            whereString += `WHERE ${customerId} `
        }
    }

    if (gameId) {
        gameId = `"gameId" = ${gameId}`

        if (whereString) {
            whereString += ` AND ${gameId}`
        }else{
            whereString += `WHERE ${gameId} `
        }
    }

    if (cpf) {
        if (whereString) {
            whereString += ` AND (c.cpf) LIKE ${cpf}% `
        }else{
            whereString += `WHERE (c.cpf) LIKE '${cpf}%' `
        }
    }

    return (`
        ${orderBy}
        ${offset}
        ${limit}
        ${whereString}
    `)
}