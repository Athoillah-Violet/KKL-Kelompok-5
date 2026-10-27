/**
 * ====================================================================
 * PETA ASSET GOOGLE DRIVE (js/asset-drive-map.js)
 * ====================================================================
 * Key HARUS sama persis dengan path di js/data.js (termasuk ejaan nama file).
 *
 * Value: link share Drive (view), BUKAN perlu /preview — sistem otomatis.
 *   https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 *
 * Wajib: Share → Siapa saja dengan link → Pembaca (Viewer)
 * ====================================================================
 */

const assetDriveMap = {
  "assets/images/members/member-01.jpg": "https://drive.google.com/file/d/1o_Bfr5gr4suiTzpKOWNXjtagtAJK1poB/view?usp=drive_link",
  "assets/images/members/member-02.jpg": "https://drive.google.com/file/d/1KLoVfbU-2x5HVZVgqvjiat7-K20h4sGC/view?usp=drive_link",
  "assets/images/members/member-03.jpg": "https://drive.google.com/file/d/1sGJQ9yHxS-BvictYPfL9QtZq-pUweTVa/view?usp=drive_link",
  "assets/images/members/member-04.jpg": "https://drive.google.com/file/d/1TqMNHU_Q-vR6yMXbv1FZucxXrBC6hMeO/view?usp=drive_link",
  "assets/images/members/member-05.jpg": "https://drive.google.com/file/d/1FnFmmi5M0HzaAdYd4RYK_YeslXpbTARN/view?usp=drive_link",
  "assets/images/members/member-06.jpg": "https://drive.google.com/file/d/1KdG2rF1_x_KfYc0l4iAZt_jjfXJAkA-f/view?usp=drive_link",
  "assets/images/members/member-07.jpg": "https://drive.google.com/file/d/10uC2ixu-BY84hqBg4fhpHNtWBJVetj2w/view?usp=drive_link",
  "assets/images/members/member-08.jpg": "https://drive.google.com/file/d/1gUgE0-WGp8RhfjaLLBWP7WZQzmOenvMH/view?usp=drive_link",
  "assets/images/members/member-09.jpg": "https://drive.google.com/file/d/1VA7zFhXGOZm_Xz_BXjwitllp96H9N2ug/view?usp=drive_link",
  "assets/images/members/member-10.jpg": "https://drive.google.com/file/d/1flxcEkt2qlxIi9Vj780lA37HTEw9qtGq/view?usp=drive_link",
  "assets/images/group/group-portrait.jpg": "https://drive.google.com/file/d/1eiSoXVw_ntBDAktnf-_rap25xN2FVzec/view?usp=drive_link",
  "assets/images/hero/hero-cover.jpg": "https://drive.google.com/file/d/1AScO6dkCK7cTWLajR-Row0i8Ib9i4iVr/view?usp=drive_link",
  // Perhatikan ejaan: journey-highlight (bukan high17ght)
  "assets/videos/journey-highlight.mp4": "https://drive.google.com/file/d/14NW8FPllK-QU3PS9rMyFJlMU4VPOpAUl/view?usp=drive_link",
  "assets/audio/wonderland-indonesia.mp3": "https://drive.google.com/file/d/1WAfqM-sdveQojpmrn6pHuAsSCfKmLOf6/view?usp=sharing",

// // Destinations[cite: 2]
//     "assets/images/destinations/IMG_5102.HEIC": "",[cite: 2]
//     "assets/images/destinations/IMG_5331.JPG.jpeg": "",[cite: 2]
//     "assets/images/destinations/IMG_5483.HEIC": "",[cite: 2]
    "assets/images/destinations/penglipuran-sub1.jpg": "",
//     "assets/images/destinations/penglipuran-sub2.jpg": "",[cite: 2]
    "assets/images/destinations/penglipuran.jpg": "https://drive.google.com/file/d/1kOwpJBNG-FUYUk2MExLz8b98WtSx-x5P/view?usp=drive_link",
//     "assets/images/destinations/tanah-lot-sub1.jpg": "",[cite: 2]
//     "assets/images/destinations/tanah-lot-sub2.jpg": "",[cite: 2]
    "assets/images/destinations/tanah-lot.jpg": "https://drive.google.com/file/d/1XdfS6cF4RKXXshYU1gzNUSKk1g9Stq3z/view?usp=drive_link",
    
    "assets/images/destinations/tanah-lot-sub1.jpg": "https://drive.google.com/file/d/1ARVbPsgNRxvpahlqR7HlRXBhI94NYb9o/view?usp=drive_link",
    "assets/images/destinations/tanah-lot-sub2.jpg": "https://drive.google.com/file/d/1pwb3vWUpsH51SvgT_S3eyexFYzHUWsEJ/view?usp=drive_linkk",
   "assets/images/destinations/devdan.jpg":"https://drive.google.com/file/d/1kOwpJBNG-FUYUk2MExLz8b98WtSx-x5P/view?usp=drive_link",
   "assets/images/destinations/devdan2.jpg":"https://drive.google.com/file/d/1L4NxZ31tdz0a0ClkMO8vAgH4i5T3Qhf1/view?usp=drive_link",
   "assets/images/destinations/devdan3.jpg":"https://drive.google.com/file/d/1nRXihZmKL1KI__OchhTeZP8qfNg_T5uC/view?usp=drive_link",
   "assets/images/destinations/devdan4.jpg":"https://drive.google.com/file/d/1aCRp79owi-IlKxrxUY8U9dtLonDSiae3/view?usp=drive_link",
//     "assets/images/destinations/tegalalang-sub1.jpg": "",[cite: 2]
//     "assets/images/destinations/tegalalang-sub2.jpg": "",[cite: 2]
//     "assets/images/destinations/tegalalang.jpg": "",[cite: 2]

    // kuta
    "assets/images/destinations/kuta.jpg": "https://drive.google.com/file/d/1CvmvcXJ__EuNGHv3r4ijjlZOhp5C1Ayu/view?usp=drive_link  ",
    "assets/images/destinations/kuta1.jpg": "https://drive.google.com/file/d/1OpSYweE9MUvrdEZ3smkJpKXVNFty1AJ_/view?usp=drive_link",
    "assets/images/destinations/kuta2.jpg": "https://drive.google.com/file/d/1UevSc_uSPdHGB8H27Yk5aAvzOZKLPe8V/view?usp=drive_link",
    "assets/images/destinations/kuta3.jpg": "https://drive.google.com/file/d/1W15r1pW9qSsHgxBh4_7AAmT10-Oi1DYb/view?usp=drive_link",
    // pandawa
    "assets/images/destinations/pandawa1.jpg": "https://drive.google.com/file/d/1wQ1Ln-G7rTKiysJ7aXNgHO2xVHUJF7zv/view?usp=drive_link",
    "assets/images/destinations/pandawa.jpg": "https://drive.google.com/file/d/14XcnPFvV1gUyarn0d0k5sFqiQ7M6xgLG/view?usp=drive_link",
    "assets/images/destinations/pandawa2.jpg": "https://drive.google.com/file/d/1cmMkzwF1eUaH4d_mMlQ-XBFvDqOZ4jUM/view?usp=drive_link",
    "assets/images/destinations/pandawa3.jpg": "https://drive.google.com/file/d/1XDEsHaLt3twrqclZG-YGwfOX_P5EI3Vc/view?usp=drive_link",
    // tari kecak(malam)
    "assets/images/destinations/kecak.jpg": "https://drive.google.com/file/d/1lnzwGOQtsat7wcs-G9Y68_XLr2hAkJUm/view?usp=drive_link",
    "assets/images/destinations/kecak-sub1.jpg": "https://drive.google.com/file/d/131kSqKdWrLrHB-q2TqlSUTNLR3n0umxz/view?usp=drive_link",
    "assets/images/destinations/kecak-sub2.jpg": "https://drive.google.com/file/d/1pmRrc-r6_fLcAMo1c4HXhf6e1PPz3a1T/view?usp=drive_link",
    "assets/images/destinations/kecak-sub3.jpg": "https://drive.google.com/file/d/1MRz0u-xmAWCZXKhXPbJuA2Xs8wQZn4D8/view?usp=drive_link",
    // kuliner
    "assets/images/destinations/jimbaran.jpg": "https://drive.google.com/file/d/1CZJPtI3VW5jDw3Zv8KIx9NS1gc9aF7su/view?usp=drive_link",
    "assets/images/destinations/jimbaran-sub1.jpg": "https://drive.google.com/file/d/1bJ4JUsfZu_IVpa_YMaPJ88pIf397Him3/view?usp=drive_link",
    "assets/images/destinations/jimbaran-sub2.jpg": "https://drive.google.com/file/d/1RM9bs0ztIhrTScd9ZWQnjYTXXsgBlPzH/view?usp=drive_link",
    "assets/images/destinations/jimbaran-sub3.jpg": "https://drive.google.com/file/d/1ytl9lhP_noHuRkcTyqbyXtr1f7El-fRu/view?usp=drive_link",
// keberangkatan
    "keberangkatan.jpg": "https://drive.google.com/file/d/1KZxjHLp8tCsZ-vYG842EuZWKsfUDbntN/view?usp=drive_link",
    // hari2
    "hari2.jpg": "https://drive.google.com/file/d/1qh8m6Tt-3VQg8wKP8S_9xbb4OAB9qus2/view?usp=drive_link",
//  hari3
    "pantai": "https://drive.google.com/file/d/17jamnCrCCUZJMXwmBjDhHvJTgO9R1zIS/view?usp=drive_link",
//     "assets/images/industry/creative-sub1.jpg": "",
//     "assets/images/industry/creative-sub2.jpg": "",[cit  e: 2]

//     // Moments[cite: 2]
//     "assets/images/moments/moment-01.jpg": "",[cite: 2]
//     "assets/images/moments/moment-02.jpg": "",[cite: 2]
//     "assets/images/moments/moment-03.jpg": "",[cite: 2]
//     "assets/images/moments/moment-04.jpg": "",[cite: 2]
//     "assets/images/moments/moment-05.jpg": "",[cite: 2]
    "assets/images/moments/moment-06.jpg": "https://drive.google.com/file/d/1FH8MvdZpOLRvD47yiKr-EzyBP2Yqa4yw/view?usp=drive_link",

};
