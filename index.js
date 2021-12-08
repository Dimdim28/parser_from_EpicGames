const axios = require("axios");
const cheerio = require("cheerio");

const parse = async () => {
  const getHTML = async (url) => {
    const { data } = await axios.get(url);
    return cheerio.load(data);
  };
  const $ = await getHTML(
    "https://www.epicgames.com/store/ru/browse?sortBy=releaseDate&sortDir=DESC&count=40&start=0"
  );
  // console.log($.html());
  const pageNumbers = $(".css-1beodaw").find("li").length - 1;
  console.log("\x1b[33m","length" + pageNumbers);

  for (let i = 0; i < pageNumbers; i++) {
    const selector = await getHTML(
      `https://www.epicgames.com/store/ru/browse?sortBy=releaseDate&sortDir=DESC&count=40&start=${
        40 * i
      }`
    );
    console.log(40 * i);
    selector("ul.css-cnqlhg").each((i, element) => {
      const title = selector(element).find(".css-2ucwu").text();
      const link = `https://www.epicgames.com${selector(element)
        .find("a")
        .attr("href")}`;
      console.log("\x1b[33m",title + link);
    });
  }
};

parse();
