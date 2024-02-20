// you won't need other imports
import fs from 'fs'
import path from 'path'

// gets path to `articles` dir in current working dir
const root = path.join(process.cwd(), 'articles')

export async function getSlugs(): Promise<string[]> {
  return new Promise<string[]>((resolve, reject) => fs.readdir(root, (err, files) => {
    if (err) {
      console.error('Error reading articles directory:', err)
      resolve([])
    } else {
      resolve(files.map((file) => file.replace(/\.md$/, '')))
    }
  }))
}

export function getArticle(slug: string): Promise<string> {
  const filePath = path.join(root, `${slug}.md`)
  return new Promise<string>((resolve, reject) => fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading article:', err)
      resolve('')
    } else {
      resolve(data)
    }
  }))
}

export function postArticle(slug: string, content: string): Promise<boolean> {
  const filePath = path.join(root, `${slug}.md`)
  return new Promise<boolean>((resolve, reject) => fs.writeFile(filePath, content, (err) => {
    if (err) {
      console.error('Error writing article:', err)
      resolve(false)
    } else {
      resolve(true)
    }
  }))
}
