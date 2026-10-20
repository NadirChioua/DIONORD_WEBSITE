import RealisationsGallery from '@/components/realisations/RealisationsGallery'
import { getContent } from '@/lib/content'

export const revalidate = 3600

export default async function RealisationsPage() {
  const { realisations } = await getContent()
  return <RealisationsGallery realisations={realisations} />
}
