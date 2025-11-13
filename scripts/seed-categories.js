const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const categories = [
  {
    name: 'Technology',
    description: 'Software development, IT, and tech professionals',
    icon: 'Code',
    color: '#3B82F6',
    tags: ['software', 'development', 'programming', 'IT', 'tech', 'coding'],
    isActive: true,
    userCount: 145
  },
  {
    name: 'Healthcare',
    description: 'Medical professionals, doctors, nurses, therapists',
    icon: 'Stethoscope',
    color: '#10B981',
    tags: ['medical', 'doctor', 'nurse', 'healthcare', 'medicine', 'therapy'],
    isActive: true,
    userCount: 89
  },
  {
    name: 'Creative Arts',
    description: 'Designers, artists, photographers, writers',
    icon: 'Palette',
    color: '#EC4899',
    tags: ['design', 'art', 'creative', 'photography', 'writing', 'graphics'],
    isActive: true,
    userCount: 67
  },
  {
    name: 'Business & Finance',
    description: 'Business professionals, accountants, consultants',
    icon: 'Briefcase',
    color: '#F59E0B',
    tags: ['business', 'finance', 'consulting', 'accounting', 'management', 'sales'],
    isActive: false,
    userCount: 123
  },
  {
    name: 'Education',
    description: 'Teachers, professors, trainers, and education professionals',
    icon: 'GraduationCap',
    color: '#8B5CF6',
    tags: ['education', 'teaching', 'training', 'academic', 'professor', 'tutor'],
    isActive: true,
    userCount: 78
  },
  {
    name: 'Marketing & Sales',
    description: 'Marketing professionals, sales representatives, digital marketers',
    icon: 'Heart',
    color: '#EF4444',
    tags: ['marketing', 'sales', 'digital marketing', 'advertising', 'promotion', 'branding'],
    isActive: true,
    userCount: 92
  },
  {
    name: 'Engineering',
    description: 'Engineers from various disciplines and specializations',
    icon: 'Wrench',
    color: '#06B6D4',
    tags: ['engineering', 'mechanical', 'electrical', 'civil', 'construction', 'technical'],
    isActive: true,
    userCount: 134
  },
  {
    name: 'Legal Services',
    description: 'Lawyers, legal advisors, and law professionals',
    icon: 'Building',
    color: '#84CC16',
    tags: ['legal', 'lawyer', 'attorney', 'law', 'legal advisor', 'paralegal'],
    isActive: true,
    userCount: 45
  }
]

async function seedCategories() {
  try {
    console.log('🌱 Starting to seed categories...')
    
    // Check if categories already exist
    const existingCategories = await prisma.category.findMany()
    if (existingCategories.length > 0) {
      console.log(`  Found ${existingCategories.length} existing categories. Skipping seed.`)
      return
    }

    // Create categories
    for (const category of categories) {
      const created = await prisma.category.create({
        data: category
      })
      console.log(` Created category: ${created.name}`)
    }

    console.log(`Successfully seeded ${categories.length} categories!`)
  } catch (error) {
    console.error(' Error seeding categories:', error)
  } finally {
    await prisma.$disconnect()
  }
}

seedCategories()
