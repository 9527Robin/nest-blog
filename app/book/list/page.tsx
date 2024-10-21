import { getContent } from '../[page]/page'
import Link from 'next/link'

const INDEX_URL = 'https://www.langrenxiaoshuo.com/allbook.html'

export default async function ListPage(req) {
  const data = await getContent(req.searchParams?.url || INDEX_URL)
  if (!data) return 404
  const cheerio = require('cheerio')
  const $ = cheerio.load(data.props.result)
  const list = $('.layout').children('.item')

  const listData = (Array.from(list) || []).map((item) => {
    return {
      name: $($(item).find('dl dt a')[0]).text(),
      link: $(item).find('dl dt a')[0].attribs.href,
      chapter: $($(item).find('dd a')[0]).text(),
    }
  })
  const pageNumText = $('.page_num .info').text()
  const pageNum = $('.page_num .info b').text()
  const nextLink = $('a[title=下一页]')[0].attribs.href
  const preLink = $('a[title=上一页]')[0].attribs.href
  return (
    <>
      <ul>
        {listData.map((item, index) => {
          return (
            <li className="border-b-2 " key={index}>
              <a className="truncate text-blue-600" href={'/book/chapter?url=' + item.link}>
                {item.name}
              </a>
              <p className="truncate text-sm">{item.chapter}</p>
            </li>
          )
        })}
      </ul>
      <p className="text-center">{pageNumText}</p>
      <div className="flex justify-around">
        <Link
          className="rounded bg-sky-600 px-4 py-2 text-sm text-white data-[active]:bg-sky-700 data-[hover]:bg-sky-500"
          href="/book/list"
        >
          首页
        </Link>
        <Link
          className={
            pageNum == '1'
              ? 'hidden'
              : 'rounded bg-sky-600 px-4 py-2 text-sm text-white data-[active]:bg-sky-700 data-[hover]:bg-sky-500'
          }
          href={'/book/list?url=' + preLink}
        >
          上一页
        </Link>
        <Link
          className="rounded bg-sky-600 px-4 py-2 text-sm text-white data-[active]:bg-sky-700 data-[hover]:bg-sky-500"
          href={'/book/list?url=' + nextLink}
        >
          下一页
        </Link>
      </div>
    </>
  )
}
