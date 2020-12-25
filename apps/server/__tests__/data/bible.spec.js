/* eslint-disable no-underscore-dangle */
const kjv = require('../../data/kjv.json');

describe('Bible JSON file', () => {
  test('should return book title', async (done) => {
    const result = kjv.JUD[1].verses[1];
    expect(result).toEqual([
      "<span data-strongs='G2455' class='strongs'>Jude</span>, <span data-strongs='G1401' class='strongs'>the servant</span> <span data-strongs='G2424' class='strongs'>of Jesus</span> <span data-strongs='G5547' class='strongs'>Christ</span>, <span data-strongs='G1161' class='strongs'>and</span> <span data-strongs='G80' class='strongs'>brother</span> <span data-strongs='G2385' class='strongs'>of James</span>, <span data-strongs='G37' class='strongs'>to them that are sanctified</span> <span data-strongs='G1722' class='strongs'>by</span> <span data-strongs='G2316' class='strongs'>God</span> <span data-strongs='G3962' class='strongs'>the Father</span>, <span data-strongs='G2532' class='strongs'>and</span> <span data-strongs='G5083' class='strongs'>preserved</span> <span data-strongs='G2424' class='strongs'>in Jesus</span> <span data-strongs='G5547' class='strongs'>Christ</span>, <em additional='1'>and</em> <span data-strongs='G2822' class='strongs'>called</span>:",
    ]);
    done();
  });

  // test('should return chapter one and all verses', async (done) => {
  //   const chapterOne = [
  //     'In the beginning God created the heaven and the earth.\n',
  //     'And the earth was without form, and void; and darkness\n',
  //     ' upon the face of the deep. And the Spirit of God moved upon the face of the waters.\n',
  //   ];
  //   const result = kjv.osis.osisText.div[0].div[0].p;
  //   expect(result).toEqual(chapterOne);
  //   done();
  // });
});
