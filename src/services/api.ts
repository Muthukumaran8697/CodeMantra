import { Image } from '../types'

const ALL_IMAGES: Image[] = [
  {
    id: '1',
    thumbnailUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&h=150&fit=crop',
    status: 'Generated',
    complexity: 'Complex',
    confidence: 94,
    imageType: 'Illustration',
    shortAlt: 'A table outlines abbreviations, symbols, payment, monuments, and landscape planting details.',
    shortAltGeneratedAt: '2025-12-27T14:20:00Z',
    longAlt: 'The table provides a detailed breakdown of abbreviations, standard symbols, payment, monuments, miscellaneous items, and landscape planting details. Each row identifies a category with corresponding symbols and descriptive notes covering vegetation types, structural markers, and financial indicators.',
    longAltGeneratedAt: '2025-12-27T14:20:00Z',
  },
  {
    id: '2',
    thumbnailUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=200&h=150&fit=crop',
    status: 'Generated',
    complexity: 'Medium',
    confidence: 88,
    imageType: 'Diagram',
    shortAlt: 'Sidewalk reinforcement grid details showing rebar spacing and concrete depth specifications.',
    shortAltGeneratedAt: '2025-12-27T14:25:00Z',
    longAlt: 'A detailed engineering drawing of a sidewalk section showing a reinforcement grid with rebar at 18-inch intervals. The cross-section indicates a 4-inch concrete slab over a 6-inch compacted gravel base.',
    longAltGeneratedAt: '2025-12-27T14:25:00Z',
  },
  {
    id: '3',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop',
    status: 'Reviewed',
    complexity: 'Complex',
    confidence: 72,
    imageType: 'Photo',
    shortAlt: 'Manual review required for this plan.',
    shortAltGeneratedAt: '2025-12-27T14:30:00Z',
    longAlt: 'Detailed view of the sidewalk section 4-B showing elevation changes and drainage patterns.',
    longAltGeneratedAt: '2025-12-27T14:30:00Z',
  },
  {
    id: '4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=150&fit=crop',
    status: 'Blank',
    complexity: 'Simple',
    confidence: 65,
    imageType: 'Chart',
    shortAlt: '',
    shortAltGeneratedAt: null,
    longAlt: '',
    longAltGeneratedAt: null,
  },
  {
    id: '5',
    thumbnailUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=150&fit=crop',
    status: 'Completed',
    complexity: 'Simple',
    confidence: 97,
    imageType: 'Photo',
    shortAlt: 'Aerial view of a residential street with mature trees lining both sides.',
    shortAltGeneratedAt: '2025-12-27T15:10:00Z',
    longAlt: 'Aerial photograph showing a residential street with mature oak and maple trees forming a canopy. Single-family homes with maintained lawns, parked vehicles on both curbs, and a crosswalk at the intersection.',
    longAltGeneratedAt: '2025-12-27T15:10:00Z',
  },
  {
    id: '6',
    thumbnailUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=200&h=150&fit=crop',
    status: 'Generated',
    complexity: 'Medium',
    confidence: 81,
    imageType: 'Diagram',
    shortAlt: 'Cross-section diagram of underground utility conduit layout.',
    shortAltGeneratedAt: '2025-12-27T15:20:00Z',
    longAlt: 'Technical cross-section showing underground utility conduit placement at varying depths: gas lines at 24 inches, water mains at 36 inches, electrical conduit at 18 inches, fiber optic at 12 inches below grade.',
    longAltGeneratedAt: '2025-12-27T15:20:00Z',
  },
  {
    id: '7',
    thumbnailUrl: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=200&h=150&fit=crop',
    status: 'Reviewed',
    complexity: 'Complex',
    confidence: 68,
    imageType: 'Chart',
    shortAlt: 'Bar chart comparing project costs across five departments for Q4 2025.',
    shortAltGeneratedAt: '2025-12-27T15:35:00Z',
    longAlt: 'Grouped bar chart showing Q4 2025 budget vs actuals across Engineering, Operations, Marketing, HR, and R&D departments.',
    longAltGeneratedAt: '2025-12-27T15:35:00Z',
  },
  {
    id: '8',
    thumbnailUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&h=150&fit=crop',
    status: 'Generated',
    complexity: 'Simple',
    confidence: 92,
    imageType: 'Illustration',
    shortAlt: 'Isometric illustration of a modern open-plan office layout.',
    shortAltGeneratedAt: '2025-12-27T15:50:00Z',
    longAlt: 'Isometric digital illustration of a modern open-plan office showing 24 workstations in clusters of 4, two enclosed meeting rooms with glass walls, and a central break area.',
    longAltGeneratedAt: '2025-12-27T15:50:00Z',
  },
  {
    id: '9',
    thumbnailUrl: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=200&h=150&fit=crop',
    status: 'Blank',
    complexity: 'Medium',
    confidence: 55,
    imageType: 'Photo',
    shortAlt: '',
    shortAltGeneratedAt: null,
    longAlt: '',
    longAltGeneratedAt: null,
  },
  {
    id: '10',
    thumbnailUrl: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=200&h=150&fit=crop',
    status: 'Generated',
    complexity: 'Complex',
    confidence: 85,
    imageType: 'Diagram',
    shortAlt: 'Network architecture diagram for a three-tier web application.',
    shortAltGeneratedAt: '2025-12-27T16:05:00Z',
    longAlt: 'Network diagram illustrating a three-tier web app: load balancer tier with two ALB instances, application tier with auto-scaling EC2 instances across two availability zones, and data tier with RDS primary and read replica.',
    longAltGeneratedAt: '2025-12-27T16:05:00Z',
  },
]

const PAGE_SIZE = 3

export function getImages(
  statusFilter: string,
  typeFilter: string,
  complexityFilter: string,
  page: number
) {
  let filtered = ALL_IMAGES

  if (statusFilter !== 'all') filtered = filtered.filter(img => img.status === statusFilter)
  if (typeFilter !== 'all') filtered = filtered.filter(img => img.imageType === typeFilter)
  if (complexityFilter !== 'all') filtered = filtered.filter(img => img.complexity === complexityFilter)

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return { images: pageItems, totalPages, totalItems: filtered.length }
}

export function getCounts() {
  const status: Record<string, number> = { all: ALL_IMAGES.length }
  const type: Record<string, number> = { all: ALL_IMAGES.length }
  const complexity: Record<string, number> = { all: ALL_IMAGES.length }

  for (const img of ALL_IMAGES) {
    status[img.status] = (status[img.status] || 0) + 1
    type[img.imageType] = (type[img.imageType] || 0) + 1
    complexity[img.complexity] = (complexity[img.complexity] || 0) + 1
  }

  return { status, type, complexity }
}

// Simulates saving — in a real app this would be axios.patch(...)
export async function saveAltText(id: string, field: 'short' | 'long', text: string) {
  await new Promise(r => setTimeout(r, 300))
  return { id, field, text, generatedAt: new Date().toISOString() }
}
