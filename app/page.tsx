import Link from 'next/link'
import styles from './page.module.css'
import { getSlugs, postArticle } from '@/lib/api'

function slugToName(slug: string): string {
  return slug
    .replace(/-/g, ' ')
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ')
}

/** Generates a slug using the first 10 words of the text */
function textToSlug(text: string): string {
  return text.split(/\W+/).slice(0, 10).join('-').toLowerCase()
}

async function getLinks(): Promise<
  {
    name: string
    href: string
  }[]
> {
  const slugs = await getSlugs()
  return slugs.map((slug) => ({
    name: slugToName(slug),
    href: `/articles/${slug}`,
  }))
}

export default async function Home() {
  const links = await getLinks()

  async function submitArticle(formData: FormData) {
    'use server'
    const articleContent = formData.get('articleContent') as string
    await postArticle(textToSlug(articleContent), articleContent)
    // ideally the page would immediately refresh here
  }

  return (
    <>
      <main>
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </main>

      <form action={submitArticle} className={styles.articleForm}>
        <textarea name="articleContent" className={styles.articleEditor} />
        <button type="submit">Post Article</button>
      </form>
    </>
  )
}
