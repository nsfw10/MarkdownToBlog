const template = (title, content) => `
  <section>
	<h1>${title}</h1>
	<article>${content}</article>
  </section>
`;

const config = [
  { title: 'I can run js', article: 'Very Cool!' },
  { title: 'I can run everything', article: 'Really Cool!' },
];

const theHtml = config
  .map(({ title, content }) => template(title, content))
  .join('\n');

console.log(theHtml);