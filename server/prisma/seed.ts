import { PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()


async function main(){
    const user = await prisma.user.create({
        data: {
            name: 'Thiago Lecheta',
            email: 'thiago.lecheta1@gmail.com',
            avaraUrl: 'https://github.com/Thiagolecheta.png'
        }
    })


    const pool = await prisma.pool.create({
        data: {
            title: 'copa 2022',
            code: 'bol123',
            ownerId: user.id,


            participants: {
                create: {
                    userId: user.id
                }
            }
        }
    })

    const game = await prisma.game.create({
        data: {
            date: '2022-11-10T00:14:36.802Z',
            firstTeamCountryCode: 'DE',
            secondTeamCountryCode: 'BR',
        }
    })

    await prisma.game.create({
        data: {
            date: '2022-11-20T00:12:36.802Z',
            firstTeamCountryCode: 'AR',
            secondTeamCountryCode: 'BR',



            guesses: {
                create: {
                    firstTeamPoints: 2,
                    secondTeamPoints: 1,


                    participant: {
                        connect: {
                            userId_poolId: {
                                userId: user.id,
                                poolId: pool.id
                            }
                        }
                    }


                    
                }
            }
        }
    })
}

main ()