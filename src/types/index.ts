export type Complexity = 'Simple' | 'Medium' | 'Complex'
export type ImageType = 'Illustration' | 'Diagram' | 'Photo' | 'Chart'
export type ImageStatus = 'Blank' | 'Generated' | 'Reviewed' | 'Completed'

export interface Image {
  id: string
  thumbnailUrl: string
  status: ImageStatus
  complexity: Complexity
  confidence: number
  imageType: ImageType
  shortAlt: string
  shortAltGeneratedAt: string | null
  longAlt: string
  longAltGeneratedAt: string | null
}
