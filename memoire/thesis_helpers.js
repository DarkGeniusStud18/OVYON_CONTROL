'use strict';

const {
  Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, HeadingLevel, BorderStyle, WidthType,
  ShadingType, VerticalAlign, PageNumber, LevelFormat,
  LineRuleType, Header, Footer
} = require('docx');

// ── CONSTANTES DE DESIGN ─────────────────────────────────────
const FONT = 'Times New Roman';
const SZ = { body:24, h3:24, h2:28, h1:32, chNum:72, caption:20, note:20, code:20, footer:18 };
const CLR = {
  navyBlue:'1F3864', royalBlue:'2E75B6', steelBlue:'4472C4',
  darkGray:'404040', medGray:'595959', lightGray:'D9D9D9', midGray:'BFBFBF',
  tableHead:'1F3864', tableZebra:'EEF3FA',
  noteYellow:'FFF2CC', noteBorder:'F0B429',
  codeGray:'F2F2F2', codeBorder:'AAAAAA',
  black:'000000', white:'FFFFFF',
};
const SP = {
  BODY_BEFORE:80, BODY_AFTER:160,
  H1_BEFORE:480, H1_AFTER:240,
  H2_BEFORE:360, H2_AFTER:180,
  H3_BEFORE:240, H3_AFTER:120,
  CAPTION_BEFORE:60, CAPTION_AFTER:180,
};
const LINE_15 = { line:360, lineRule:LineRuleType.AUTO };
const FIRST_LINE_INDENT = 720;
const CONTENT_WIDTH = 8666;

// ── NUMBERING ────────────────────────────────────────────────
const NUMBERING = [
  { reference:'bullets', levels:[
    { level:0, format:LevelFormat.BULLET, text:'\u2022', alignment:AlignmentType.LEFT,
      style:{ paragraph:{ indent:{left:720,hanging:360}, spacing:{before:60,after:60,...LINE_15} }, run:{font:FONT,size:SZ.body} } },
    { level:1, format:LevelFormat.BULLET, text:'\u25E6', alignment:AlignmentType.LEFT,
      style:{ paragraph:{ indent:{left:1080,hanging:360}, spacing:{before:40,after:40,...LINE_15} }, run:{font:FONT,size:SZ.body} } },
  ]},
  { reference:'numbered', levels:[
    { level:0, format:LevelFormat.DECIMAL, text:'%1.', alignment:AlignmentType.LEFT,
      style:{ paragraph:{ indent:{left:720,hanging:360}, spacing:{before:80,after:80,...LINE_15} }, run:{font:FONT,size:SZ.body} } },
  ]},
  { reference:'alpha', levels:[
    { level:0, format:LevelFormat.LOWER_LETTER, text:'%1)', alignment:AlignmentType.LEFT,
      style:{ paragraph:{ indent:{left:720,hanging:360}, spacing:{before:60,after:60,...LINE_15} }, run:{font:FONT,size:SZ.body} } },
  ]},
];

// ── STYLES ───────────────────────────────────────────────────
const STYLES = {
  default: {
    document: {
      run: { font:FONT, size:SZ.body, color:CLR.black },
      paragraph: { alignment:AlignmentType.JUSTIFIED, spacing:{before:SP.BODY_BEFORE,after:SP.BODY_AFTER,...LINE_15} },
    },
  },
  paragraphStyles: [
    { id:'Heading1', name:'Heading 1', basedOn:'Normal', next:'Normal', quickFormat:true,
      run:{ font:FONT, size:SZ.h1, bold:true, color:CLR.navyBlue },
      paragraph:{ spacing:{before:SP.H1_BEFORE,after:SP.H1_AFTER,...LINE_15},
        border:{ bottom:{style:BorderStyle.SINGLE,size:8,color:CLR.royalBlue,space:6} }, outlineLevel:0 } },
    { id:'Heading2', name:'Heading 2', basedOn:'Normal', next:'Normal', quickFormat:true,
      run:{ font:FONT, size:SZ.h2, bold:true, color:CLR.royalBlue },
      paragraph:{ spacing:{before:SP.H2_BEFORE,after:SP.H2_AFTER,...LINE_15}, outlineLevel:1 } },
    { id:'Heading3', name:'Heading 3', basedOn:'Normal', next:'Normal', quickFormat:true,
      run:{ font:FONT, size:SZ.h3, bold:true, color:CLR.darkGray },
      paragraph:{ spacing:{before:SP.H3_BEFORE,after:SP.H3_AFTER,...LINE_15}, outlineLevel:2 } },
  ],
};

// ── SECTION PROPS ────────────────────────────────────────────
const SECTION_PROPS = {
  page: {
    size: { width:11906, height:16838 },
    margin: { top:1418, right:1418, bottom:1418, left:1701 },
  },
};

// ── INTERNAL ─────────────────────────────────────────────────
function _cb(color, size) {
  const b = { style:BorderStyle.SINGLE, size, color, space:0 };
  return { top:b, bottom:b, left:b, right:b };
}

// ── HELPERS TYPOGRAPHIQUES ───────────────────────────────────
function h1(text) {
  return new Paragraph({ heading:HeadingLevel.HEADING_1,
    children:[new TextRun({ text, font:FONT, size:SZ.h1, bold:true, color:CLR.navyBlue })] });
}
function h2(text) {
  return new Paragraph({ heading:HeadingLevel.HEADING_2,
    children:[new TextRun({ text, font:FONT, size:SZ.h2, bold:true, color:CLR.royalBlue })] });
}
function h3(text) {
  return new Paragraph({ heading:HeadingLevel.HEADING_3,
    children:[new TextRun({ text, font:FONT, size:SZ.h3, bold:true, color:CLR.darkGray })] });
}

function p(text, opts={}) {
  return new Paragraph({
    alignment: opts.center ? AlignmentType.CENTER : AlignmentType.JUSTIFIED,
    indent: opts.noIndent ? undefined : { firstLine:FIRST_LINE_INDENT },
    spacing: { before:opts.before!==undefined?opts.before:SP.BODY_BEFORE,
               after: opts.after!==undefined?opts.after:SP.BODY_AFTER, ...LINE_15 },
    children:[new TextRun({ text, font:FONT, size:opts.size||SZ.body,
      bold:opts.bold||false, italic:opts.italic||false, color:opts.color||CLR.black })],
  });
}
function pNoIndent(text, opts={}) { return p(text,{...opts,noIndent:true}); }
function pItalic(text, opts={})   { return p(text,{...opts,italic:true,center:true,noIndent:true}); }

function pBoldInline(boldPart, normalPart, opts={}) {
  return new Paragraph({
    alignment:AlignmentType.JUSTIFIED,
    indent: opts.noIndent?undefined:{firstLine:FIRST_LINE_INDENT},
    spacing:{ before:opts.before!==undefined?opts.before:SP.BODY_BEFORE,
              after: opts.after!==undefined?opts.after:SP.BODY_AFTER, ...LINE_15 },
    children:[
      new TextRun({ text:boldPart, font:FONT, size:SZ.body, bold:true }),
      new TextRun({ text:normalPart, font:FONT, size:SZ.body }),
    ],
  });
}

function citRef(num) {
  return new TextRun({ text:` [${num}]`, font:FONT, size:SZ.body, bold:true, color:CLR.royalBlue });
}

function bullet(text, level=0) {
  return new Paragraph({ numbering:{reference:'bullets',level},
    children:[new TextRun({text,font:FONT,size:SZ.body})] });
}
function numbered(text) {
  return new Paragraph({ numbering:{reference:'numbered',level:0},
    children:[new TextRun({text,font:FONT,size:SZ.body})] });
}
function alphaList(text) {
  return new Paragraph({ numbering:{reference:'alpha',level:0},
    children:[new TextRun({text,font:FONT,size:SZ.body})] });
}

function spacer(pts=120) {
  return new Paragraph({ spacing:{before:0,after:pts,line:240,lineRule:LineRuleType.AUTO},
    children:[new TextRun({text:'',font:FONT,size:SZ.body})] });
}
function pageBreak() {
  return new Paragraph({ spacing:{before:0,after:0},
    children:[new TextRun({break:1,font:FONT,size:SZ.body})] });
}

// ── CAPTIONS ────────────────────────────────────────────────
function figureCaption(num, title) {
  return new Paragraph({
    alignment:AlignmentType.CENTER,
    spacing:{before:60,after:SP.CAPTION_AFTER,line:280,lineRule:LineRuleType.AUTO},
    children:[
      new TextRun({text:`Figure ${num}`,font:FONT,size:SZ.caption,bold:true,color:CLR.navyBlue}),
      new TextRun({text:` \u2013 ${title}`,font:FONT,size:SZ.caption,italic:true,color:CLR.medGray}),
    ],
  });
}
function tableCaption(num, title) {
  return new Paragraph({
    alignment:AlignmentType.CENTER,
    spacing:{before:60,after:SP.CAPTION_AFTER,line:280,lineRule:LineRuleType.AUTO},
    children:[
      new TextRun({text:`Tableau ${num}`,font:FONT,size:SZ.caption,bold:true,color:CLR.navyBlue}),
      new TextRun({text:` \u2013 ${title}`,font:FONT,size:SZ.caption,italic:true,color:CLR.medGray}),
    ],
  });
}

// ── FIGURE PLACEHOLDER ───────────────────────────────────────
function figurePlaceholder(num, title, description, heightDXA=2880) {
  const fBorder = { style:BorderStyle.DASHED, size:6, color:CLR.midGray };

  const labelRow = new TableRow({ children:[new TableCell({
    width:{size:CONTENT_WIDTH,type:WidthType.DXA},
    shading:{fill:'2E75B6',type:ShadingType.CLEAR},
    margins:{top:80,bottom:80,left:160,right:160},
    borders:{top:fBorder,bottom:{style:BorderStyle.SINGLE,size:4,color:CLR.midGray},left:fBorder,right:fBorder},
    children:[new Paragraph({
      alignment:AlignmentType.CENTER,
      spacing:{before:40,after:40,line:280,lineRule:LineRuleType.AUTO},
      children:[
        new TextRun({text:`FIGURE ${num}  \u25FC  `,font:FONT,size:22,bold:true,color:CLR.white}),
        new TextRun({text:title.toUpperCase(),font:FONT,size:20,bold:true,color:'DDEEFF'}),
      ],
    })],
  })]});

  const contentRow = new TableRow({ children:[new TableCell({
    width:{size:CONTENT_WIDTH,type:WidthType.DXA},
    shading:{fill:'F4F7FC',type:ShadingType.CLEAR},
    margins:{top:200,bottom:200,left:240,right:240},
    borders:{top:{style:BorderStyle.SINGLE,size:2,color:CLR.midGray},
             bottom:fBorder, left:fBorder, right:fBorder},
    children:[
      new Paragraph({ alignment:AlignmentType.CENTER, spacing:{before:60,after:60,line:280,lineRule:LineRuleType.AUTO},
        children:[new TextRun({text:'[ INSERVER ICI ]',font:FONT,size:24,bold:true,italic:true,color:CLR.royalBlue})] }),
      new Paragraph({ alignment:AlignmentType.CENTER, spacing:{before:40,after:40,line:300,lineRule:LineRuleType.AUTO},
        children:[new TextRun({text:description,font:FONT,size:SZ.note,italic:true,color:CLR.darkGray})] }),
      new Paragraph({ alignment:AlignmentType.CENTER, spacing:{before:60,after:40,line:280,lineRule:LineRuleType.AUTO},
        children:[new TextRun({text:'Format : PNG ou SVG, resolution >= 150 dpi, largeur recommandee 14 cm',font:FONT,size:18,italic:true,color:CLR.medGray})] }),
    ],
  })]});

  return [
    spacer(80),
    new Table({ width:{size:CONTENT_WIDTH,type:WidthType.DXA}, columnWidths:[CONTENT_WIDTH],
      rows:[labelRow,contentRow] }),
    figureCaption(num, title),
    spacer(80),
  ];
}

// ── TABLES ──────────────────────────────────────────────────
function makeTable(headers, rows, colWidths, opts={}) {
  const total = colWidths.reduce((a,b)=>a+b,0);
  const borderH = {style:BorderStyle.SINGLE,size:6,color:CLR.royalBlue};
  const borderN = {style:BorderStyle.SINGLE,size:3,color:CLR.midGray};

  const headerRow = new TableRow({ tableHeader:true, children:
    headers.map((h,i)=>new TableCell({
      width:{size:colWidths[i],type:WidthType.DXA},
      shading:{fill:CLR.tableHead,type:ShadingType.CLEAR},
      verticalAlign:VerticalAlign.CENTER,
      margins:{top:100,bottom:100,left:140,right:140},
      borders:{top:borderH,bottom:borderH,left:borderH,right:borderH},
      children:[new Paragraph({
        alignment:AlignmentType.CENTER,
        spacing:{before:40,after:40,line:280,lineRule:LineRuleType.AUTO},
        children:[new TextRun({text:h,font:FONT,size:SZ.body,bold:true,color:CLR.white})],
      })],
    }))
  });

  const dataRows = rows.map((row,ri)=>new TableRow({ children:
    row.map((cell,ci)=>new TableCell({
      width:{size:colWidths[ci],type:WidthType.DXA},
      shading:{fill:ri%2===0?CLR.white:CLR.tableZebra,type:ShadingType.CLEAR},
      verticalAlign:VerticalAlign.CENTER,
      margins:{top:80,bottom:80,left:140,right:140},
      borders:{top:borderN,bottom:borderN,left:borderN,right:borderN},
      children:[new Paragraph({
        alignment:(opts.centerAll||(ci>0&&!opts.leftAll))?AlignmentType.CENTER:AlignmentType.LEFT,
        spacing:{before:40,after:40,line:300,lineRule:LineRuleType.AUTO},
        children:[new TextRun({text:cell,font:FONT,size:SZ.body,
          bold:(opts.firstColBold&&ci===0)||false})],
      })],
    }))
  }));

  return new Table({ width:{size:total,type:WidthType.DXA}, columnWidths:colWidths,
    rows:[headerRow,...dataRows] });
}

function makeSimpleTable(rows, colWidths) {
  const total = colWidths.reduce((a,b)=>a+b,0);
  const border = {style:BorderStyle.SINGLE,size:3,color:CLR.midGray};
  const borders = {top:border,bottom:border,left:border,right:border};
  return new Table({ width:{size:total,type:WidthType.DXA}, columnWidths:colWidths,
    rows: rows.map((row,ri)=>new TableRow({ children:
      row.map((cell,ci)=>new TableCell({
        width:{size:colWidths[ci],type:WidthType.DXA},
        shading:{fill:ri%2===0?CLR.white:CLR.tableZebra,type:ShadingType.CLEAR},
        margins:{top:80,bottom:80,left:140,right:140}, borders,
        children:[new Paragraph({ spacing:{before:40,after:40,line:300,lineRule:LineRuleType.AUTO},
          children:[new TextRun({text:cell,font:FONT,size:SZ.body})] })],
      }))
    }))
  });
}

// ── HELPERS SPECIAUX ─────────────────────────────────────────
function chapterOpener(chapterNum, chapterTitle, chapterIntro) {
  return [
    spacer(480),
    new Paragraph({ alignment:AlignmentType.CENTER, spacing:{before:0,after:80,line:240,lineRule:LineRuleType.AUTO},
      children:[new TextRun({text:`CHAPITRE ${chapterNum}`,font:FONT,size:SZ.chNum,bold:true,color:CLR.lightGray})] }),
    new Paragraph({ alignment:AlignmentType.CENTER,
      border:{bottom:{style:BorderStyle.THICK,size:12,color:CLR.royalBlue,space:6}},
      spacing:{before:0,after:120}, children:[new TextRun({text:' ',font:FONT,size:10})] }),
    spacer(80),
    new Paragraph({ alignment:AlignmentType.CENTER, spacing:{before:60,after:60,...LINE_15},
      children:[new TextRun({text:chapterTitle,font:FONT,size:36,bold:true,color:CLR.navyBlue})] }),
    spacer(160),
    new Paragraph({ alignment:AlignmentType.JUSTIFIED, indent:{left:720,right:720},
      spacing:{before:80,after:80,...LINE_15},
      border:{ left:{style:BorderStyle.THICK,size:8,color:CLR.royalBlue,space:12} },
      children:[new TextRun({text:chapterIntro,font:FONT,size:SZ.body,italic:true,color:CLR.darkGray})] }),
    pageBreak(),
  ];
}

function sectionDivider(label) {
  return new Paragraph({ alignment:AlignmentType.CENTER,
    spacing:{before:240,after:240,line:280,lineRule:LineRuleType.AUTO},
    border:{
      top:{style:BorderStyle.SINGLE,size:4,color:CLR.steelBlue,space:6},
      bottom:{style:BorderStyle.SINGLE,size:4,color:CLR.steelBlue,space:6},
    },
    children:[new TextRun({text:label||'* * *',font:FONT,size:22,bold:true,color:CLR.steelBlue})] });
}

function codeBlock(lines, label) {
  const border = {style:BorderStyle.SINGLE,size:4,color:CLR.codeBorder};
  const noBorder = {style:BorderStyle.NONE,size:0,color:CLR.white};
  const codeRows = lines.map(line=>new TableRow({ children:[new TableCell({
    width:{size:CONTENT_WIDTH,type:WidthType.DXA},
    shading:{fill:CLR.codeGray,type:ShadingType.CLEAR},
    margins:{top:20,bottom:20,left:200,right:200},
    borders:{top:noBorder,bottom:noBorder,left:border,right:border},
    children:[new Paragraph({ spacing:{before:8,after:8,line:260,lineRule:LineRuleType.AUTO},
      children:[new TextRun({text:line||' ',font:'Courier New',size:SZ.code,color:CLR.darkGray})] })],
  })] }));
  const titleRows = label ? [new TableRow({ children:[new TableCell({
    width:{size:CONTENT_WIDTH,type:WidthType.DXA},
    shading:{fill:CLR.darkGray,type:ShadingType.CLEAR},
    margins:{top:60,bottom:60,left:200,right:200},
    borders:{top:border,bottom:border,left:border,right:border},
    children:[new Paragraph({ spacing:{before:20,after:20,line:260,lineRule:LineRuleType.AUTO},
      children:[new TextRun({text:label,font:'Courier New',size:SZ.code,bold:true,color:CLR.white})] })],
  })] })] : [];
  return [spacer(80),
    new Table({width:{size:CONTENT_WIDTH,type:WidthType.DXA},columnWidths:[CONTENT_WIDTH],rows:[...titleRows,...codeRows]}),
    spacer(80)];
}

function noteAcademique(type, text) {
  return [spacer(80),
    new Paragraph({ alignment:AlignmentType.JUSTIFIED, indent:{left:360,right:360},
      spacing:{before:120,after:120,...LINE_15},
      shading:{fill:CLR.noteYellow,type:ShadingType.CLEAR},
      border:{
        top:{style:BorderStyle.SINGLE,size:3,color:CLR.noteBorder,space:4},
        bottom:{style:BorderStyle.SINGLE,size:3,color:CLR.noteBorder,space:4},
        left:{style:BorderStyle.THICK,size:12,color:CLR.noteBorder,space:10},
        right:{style:BorderStyle.SINGLE,size:3,color:CLR.noteBorder,space:4},
      },
      children:[
        new TextRun({text:`${type.toUpperCase()} : `,font:FONT,size:SZ.note,bold:true,color:'7B4F00'}),
        new TextRun({text,font:FONT,size:SZ.note,color:CLR.darkGray}),
      ],
    }),
    spacer(80)];
}

function definitionBox(term, definition) {
  return [spacer(80),
    new Paragraph({ alignment:AlignmentType.JUSTIFIED, indent:{left:360,right:360},
      spacing:{before:120,after:120,...LINE_15},
      shading:{fill:'EBF3FB',type:ShadingType.CLEAR},
      border:{
        top:{style:BorderStyle.SINGLE,size:3,color:CLR.steelBlue,space:4},
        bottom:{style:BorderStyle.SINGLE,size:3,color:CLR.steelBlue,space:4},
        left:{style:BorderStyle.THICK,size:12,color:CLR.steelBlue,space:10},
        right:{style:BorderStyle.SINGLE,size:3,color:CLR.steelBlue,space:4},
      },
      children:[
        new TextRun({text:`${term} : `,font:FONT,size:SZ.body,bold:true,color:CLR.navyBlue}),
        new TextRun({text:definition,font:FONT,size:SZ.body,color:CLR.darkGray}),
      ],
    }),
    spacer(80)];
}

function makeHeader() {
  return new Header({ children:[new Paragraph({
    alignment:AlignmentType.RIGHT,
    spacing:{before:0,after:120,line:280,lineRule:LineRuleType.AUTO},
    border:{bottom:{style:BorderStyle.SINGLE,size:4,color:CLR.royalBlue,space:6}},
    children:[new TextRun({text:'Memoire de Licence SIL  |  Ovyon Control  |  HECM Benin 2025-2026',
      font:FONT,size:18,italic:true,color:CLR.medGray})],
  })] });
}

function makeFooter() {
  return new Footer({ children:[new Paragraph({
    alignment:AlignmentType.CENTER,
    spacing:{before:80,after:0,line:280,lineRule:LineRuleType.AUTO},
    border:{top:{style:BorderStyle.SINGLE,size:4,color:CLR.royalBlue,space:6}},
    children:[
      new TextRun({text:'Page ',font:FONT,size:SZ.footer,color:CLR.medGray}),
      new TextRun({children:[PageNumber.CURRENT],font:FONT,size:SZ.footer,color:CLR.navyBlue,bold:true}),
      new TextRun({text:'  /  ',font:FONT,size:SZ.footer,color:CLR.medGray}),
      new TextRun({children:[PageNumber.TOTAL_PAGES],font:FONT,size:SZ.footer,color:CLR.medGray}),
    ],
  })] });
}

// ── EXPORTS ──────────────────────────────────────────────────
module.exports = {
  FONT, SZ, CLR, SP, LINE_15, FIRST_LINE_INDENT, CONTENT_WIDTH,
  NUMBERING, STYLES, SECTION_PROPS,
  h1, h2, h3,
  p, pNoIndent, pItalic, pBoldInline,
  bullet, numbered, alphaList,
  spacer, pageBreak, citRef,
  figurePlaceholder, figureCaption, tableCaption,
  makeTable, makeSimpleTable,
  chapterOpener, sectionDivider, codeBlock,
  noteAcademique, definitionBox,
  makeHeader, makeFooter,
};
