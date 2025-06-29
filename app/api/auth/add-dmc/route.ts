// import { NextResponse } from 'next/server'
// import { getServerSession } from 'next-auth'
// import { authOptions } from '@/lib/auth'
// import prisma from '@/lib/prisma'

// // GET all AddDMCs
// export async function GET(request: Request) {
//   const session = await getServerSession(authOptions)

//   if (!session) {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//   }

//   try {
//     const { searchParams } = new URL(request.url)
//     const searchQuery = searchParams.get('search') || ''
//     const sortBy = searchParams.get('sortBy') || 'name'
//     const sortOrder = searchParams.get('sortOrder') || 'asc'
//     const page = parseInt(searchParams.get('page') || '1')
//     const limit = parseInt(searchParams.get('limit') || '5')

//     const where = {
//       OR: [
//         { name: { contains: searchQuery, mode: 'insensitive' } },
//         { primaryContact: { contains: searchQuery, mode: 'insensitive' } },
//         { email: { contains: searchQuery, mode: 'insensitive' } },
//       ],
//     }

//     const orderBy = {
//       [sortBy]: sortOrder,
//     }

//     const [addDMCs, totalCount] = await Promise.all([
//       prisma.addDMC.findMany({
//         where,
//         orderBy,
//         skip: (page - 1) * limit,
//         take: limit,
//         select: {
//           id: true,
//           name: true,
//           primaryContact: true,
//           phoneNumber: true,
//           designation: true,
//           email: true,
//           status: true,
//           joinSource: true,
//           createdAt: true,
//         },
//       }),
//       prisma.addDMC.count({ where }),
//     ])

//     return NextResponse.json({
//       data: addDMCs,
//       total: totalCount,
//       page,
//       totalPages: Math.ceil(totalCount / limit),
//     })
//   } catch (error) {
//     console.error('Error fetching AddDMCs:', error)
//     return NextResponse.json(
//       { error: 'Failed to fetch AddDMCs' },
//       { status: 500 }
//     )
//   }
// }

// // POST create new AddDMC
// export async function POST(request: Request) {
//   const session = await getServerSession(authOptions)

//   if (!session) {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//   }

//   try {
//     const formData = await request.formData()
    
//     const addDMCData = {
//       name: formData.get('dmcName') as string,
//       primaryContact: formData.get('primaryContact') as string,
//       phoneNumber: formData.get('phoneNumber') as string,
//       phoneExtension: formData.get('phoneExtension') as string || '+91',
//       designation: formData.get('designation') as string,
//       ownerName: formData.get('ownerName') as string,
//       ownerPhoneNumber: formData.get('ownerPhoneNumber') as string,
//       ownerPhoneExtension: formData.get('ownerPhoneExtension') as string || '+91',
//       email: formData.get('email') as string,
//       website: formData.get('website') as string || null,
//       primaryCountry: formData.get('primaryCountry') as string,
//       destinationsCovered: (formData.get('destinationsCovered') as string)?.split(',').map(d => d.trim()) || [],
//       cities: (formData.get('cities') as string)?.split(',').map(c => c.trim()) || [],
//       gstRegistration: formData.get('gstRegistration') === 'Yes',
//       gstNo: formData.get('gstNo') as string || null,
//       yearOfRegistration: formData.get('yearOfRegistration') as string || null,
//       panNo: formData.get('panNo') as string,
//       panType: formData.get('panType') as string,
//       headquarters: formData.get('headquarters') as string,
//       country: formData.get('country') as string,
//       yearOfExperience: formData.get('yearOfExperience') as string,
//       registrationCertificate: formData.get('registrationCertificate') as string || null,
//       createdBy: session.user.id,
//     }

//     const newAddDMC = await prisma.addDMC.create({
//       data: addDMCData,
//     })

//     return NextResponse.json(newAddDMC, { status: 201 })
//   } catch (error) {
//     console.error('Error creating AddDMC:', error)
//     return NextResponse.json(
//       { error: 'Failed to create AddDMC' },
//       { status: 500 }
//     )
//   }
// }