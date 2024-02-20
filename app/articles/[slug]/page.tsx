import { getArticle } from '@/lib/api'
import { useRouter } from 'next/router'

export default function ArticlePage() {
  const router = useRouter();
  const article = getArticle(router.query.slug as string)
  return <>{article}</>
}
