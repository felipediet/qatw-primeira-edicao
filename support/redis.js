import { Queue } from "bullmq";

//Cria a conexão com o Redis
const connection = {
    host: 'paybank-redis',
    port: 6379,
};

//Cria a fila
const queueName = 'twoFactorQueue';

//Se inscreve na fila
const queue = new Queue(queueName, { connection });

export const getJob = async () => {
    const jobs = await queue.getJobs(); //Busca todos os Jobs
    return jobs[0].data.code; //Seleciona o code do primeiro Job da fila
}

export const cleanJobs = async () => {
    await queue.obliterate({ force:true }); //Limpa todos os Jobs
}