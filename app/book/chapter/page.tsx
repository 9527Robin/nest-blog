import { getContent } from '../[page]/page'

export default async function ChapterPage(req) {
  const data = await getContent(req.searchParams?.url)
  if (!data) return 404
  const cheerio = require('cheerio')
  const $ = cheerio.load(data.props.result)
  const list = $('.section-list').children('li')
  const listData = (Array.from(list) || []).map((item) => {
    return {
      link: $(item).find('a')[0].attribs.href,
      chapter: $($(item).find('a')[0]).text(),
    }
  })
  return (
    <ul>
      {listData.map((item, index) => {
        return (
          <li className="text-blue-600" key={index}>
            <a href={'/book/1?url=' + item.link}>{item.chapter}</a>
          </li>
        )
      })}
    </ul>
  )
}
