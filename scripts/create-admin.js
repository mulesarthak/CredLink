const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function createAdmin() {
  try {
    console.log('🔍 Checking for existing admin users...')
    
    const existingAdmins = await prisma.admin.findMany()
    console.log(`Found ${existingAdmins.length} admin(s):`)
    
    existingAdmins.forEach(admin => {
      console.log(`- ${admin.email} (${admin.role}) - Active: ${admin.isActive}`)
    })

    if (existingAdmins.length === 0) {
      console.log('\n🚀 Creating default admin user...')
      
      const defaultEmail = 'admin@credlink.com'
      const defaultPassword = 'admin123'
      const hashedPassword = await bcrypt.hash(defaultPassword, 10)
      
      const defaultPermissions = JSON.stringify({
        users: { read: true, write: true, delete: true },
        analytics: { read: true },
        profiles: { read: true, write: true, delete: true },
        support: { read: true, write: true }
      })

      const admin = await prisma.admin.create({
        data: {
          email: defaultEmail,
          password: hashedPassword,
          fullName: 'System Administrator',
          role: 'SUPER_ADMIN',
          permissions: defaultPermissions,
          isActive: true
        }
      })

      console.log('✅ Admin user created successfully!')
      console.log(`📧 Email: ${defaultEmail}`)
      console.log(`🔑 Password: ${defaultPassword}`)
      console.log(`👤 Role: ${admin.role}`)
      console.log('\n⚠️  IMPORTANT: Please change the default password after first login!')
    } else {
      console.log('\n✅ Admin users already exist.')
      
      // Check if any admin is active
      const activeAdmins = existingAdmins.filter(admin => admin.isActive)
      if (activeAdmins.length === 0) {
        console.log('⚠️  No active admin users found. Activating the first admin...')
        await prisma.admin.update({
          where: { id: existingAdmins[0].id },
          data: { isActive: true }
        })
        console.log(`✅ Activated admin: ${existingAdmins[0].email}`)
      }
    }
  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createAdmin()
