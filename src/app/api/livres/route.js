import { PrismaClient } from '@prisma/client';
import {NextRequest,  NextResponse } from "next/server";

const prisma = new PrismaClient();

export const QueryLiv=async()=>{
  try {
      const listl=await prisma.livres.findMany();
      return listl
  } catch (error) {
      console.log(error)
  }
  finally{
      prisma.$disconnect()
  }
}


export const QueryLivPopulated=async()=>{
  try {
    const list1 = await prisma.livres.findMany({
      include: {
        specialites: {
          select: {
            id : true,
            nomspecialite: true,
          },
        },
        editeurs: {
          select: {
            id : true,
            maisonedit: true,
          },
        },
        livre_auteur: {
          include: {
            auteurs: {
              select: {
                id : true,
                nomauteur: true,
              },
            }
          }
        }
          } 
    })
    return list1
  } catch (error) {
      console.log(error)
  }
  finally{
      prisma.$disconnect()
  }
}



export const GET=async() =>{
 
  const livres = await QueryLivPopulated()

return NextResponse.json(livres);
}

// CREATE DATA

export const POST=async(req)=> {
  try {
    const livre = await req.json();
    const result = await prisma.livres.create({
      data: livre,
    });
    return NextResponse.json( result )
  } catch (error) {
    return new NextResponse(JSON.stringify(error), {
   status: 500,
   headers: { "Content-Type": "application/json" },
 });
}

   
  }
  