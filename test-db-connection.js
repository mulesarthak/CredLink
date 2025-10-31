const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})

async function testConnection() {
  try {
    console.log('🔄 Testing database connection...')
    
    // Test the connection
    await prisma.$connect()
    console.log('✅ Database connection successful!')
    
    // Execute a simple query to verify
    const result = await prisma.$queryRaw`SELECT 1 as test`
    console.log('✅ Query execution successful:', result)
    
    // Get database version
    const version = await prisma.$queryRaw`SELECT VERSION() as version`
    console.log('📊 MySQL Version:', version[0].version)
    
  } catch (error) {
    console.error('❌ Database connection failed:')
    console.error('Error:', error.message)
    
    if (error.code) {
      console.error('Error Code:', error.code)
    }
    
    // Provide helpful error messages
    if (error.message.includes('ECONNREFUSED')) {
      console.error('\n💡 Tip: Make sure your MySQL server is running and accessible.')
    } else if (error.message.includes('Access denied')) {
      console.error('\n💡 Tip: Check your database credentials (username/password).')
    } else if (error.message.includes('Unknown database')) {
      console.error('\n💡 Tip: The database does not exist. Create it first.')
    }
    
    process.exit(1)
  } finally {
    await prisma.$disconnect()
    console.log('\n🔌 Disconnected from database')
  }
}

testConnection()
