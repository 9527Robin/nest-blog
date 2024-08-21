import Link from 'next/link'

async function getContent(url: string) {
  if (!url) return
  // const res = await fetch('https://www.langrenxiaoshuo.com/html/fengyanyilu/787342.html')
  // console.log(url, 'url')
  const res = await fetch(url)
  const iconv = require('iconv-lite')

  const buffer = await res.arrayBuffer()
  const result = iconv.decode(Buffer.from(buffer), 'gbk') // 假设是 GBK 编码
  // console.log(result)
  return {
    props: { result }, // will be passed to the page component as props
  }
}

const getPageUrl = (eid, chapter, page, domain = 'https://www.langrenxiaoshuo.com/') => {
  return domain + eid + '/' + chapter + '_' + page + '.html'
}

export default async function BookIndexPage(req) {
  const params = req.params
  const data = await getContent(req.searchParams.url)
  const searchParams = req.searchParams.url
  if (!data) {
    return <>404</>
  }
  const cheerio = require('cheerio')
  const $ = cheerio.load(data.props.result)
  // console.log(data.props.result)
  const lastChild = $('.chapterPages').text()
  const content = $('#content')
    .text()
    .replace(/【\d+】/g, '')
  const pageList: string[] = lastChild.match(/\d+/g)

  // const reg = new RegExp('\\d+[.html | [_/d+]]', 'g')

  // const reg1 = new RegExp(`\\d+/${chapter}`)
  const temp = $('.chapterPages')
    .html()
    .match(/\/(\d+)\/(\d+)_\d+/)?.[0]
  const eid = temp.match(/\d+/g)[0]
  const chapter = temp.match(/\d+/g)[1]
  const nextChapter = $('a[rel=prefetch]')?.[0]?.attribs.href
  const pageNum = Number(params.page)
  const nextPage = '/book/' + (pageNum + 1) + '?url=' + getPageUrl(eid, chapter, pageNum + 1)
  const prePage = '/book/' + (pageNum - 1) + '?url=' + getPageUrl(eid, chapter, pageNum - 1)
  const nextChapterPage = '/book/1/?url=' + nextChapter

  return (
    <div className="m-auto rounded-md bg-[#f7f0e1] leading-8 text-[#56441e]">
      <div className="m-auto max-w-xl rounded-md border border-[#c2b280] bg-[#fff9e6] p-4 ">
        {content}
      </div>
      <div className="flex justify-around py-2">
        <Link
          // className={ params.page === '0' ? 'hidden' : '' }
          href={prePage}
          className={
            params.page === '1'
              ? 'hidden '
              : '' +
                'rounded bg-sky-600 px-4 py-2 text-sm text-white data-[active]:bg-sky-700 data-[hover]:bg-sky-500'
          }
        >
          上一页
        </Link>
        {params.page} / {pageList?.length}
        <Link
          href={nextPage}
          className="rounded bg-sky-600 px-4 py-2 text-sm text-white data-[active]:bg-sky-700 data-[hover]:bg-sky-500"
        >
          下一页
        </Link>
        <Link
          href={nextChapterPage}
          className="rounded bg-sky-600 px-4 py-2 text-sm text-white data-[active]:bg-sky-700 data-[hover]:bg-sky-500"
        >
          下一章
        </Link>
      </div>
    </div>
  )
}
