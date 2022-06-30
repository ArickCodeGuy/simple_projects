// Create reference instance
import { marked } from 'marked';


const toc = []
// Override function
const renderer = {
  heading(text, level) {
    const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

    toc.push({
      level,
      text,
      link: '#' + escapedText
    })

    return `
            <h${level}>
              <a name="${escapedText}" class="anchor" href="#${escapedText}"></a>
              ${text}
            </h${level}>`;
  }
};

marked.use({ renderer });

export default (md) => {
    return {
        headings: toc,
        html: marked.parse(md),
    }
}