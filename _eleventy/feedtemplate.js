module.exports = {
  xml: data => {
    let template = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
<title>${ data.title }</title>
<link href="${ data.feedUrl }" rel="self"/>
<link href="${ data.url }"/>
<updated>${ data.date }</updated>
<id>${ data.id }</id>
<author>
<name>postedin</name>
<email>${ data.authorMail }</email>
</author>`;

    for (var i = 0; i < data.posts.length; i++) {
      const year =  data.posts[i];

      for (var j = 0; j < year.posts.length; j++) {
        const post =  year.posts[j];
        template += `<entry>`;
        template += `<title>${post.title}</title>`;
        template += `<link href="${ post.link }"/>`;
        template += `<updated>${ post.date }</updated>`;
        template += `<id>${ post.link }</id>`;

        template += `</entry>`;
      }
    }

    template += `</feed>`;

    return template;
  }
}
