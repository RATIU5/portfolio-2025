/**
 * Map of named character references.
 *
 * @type {Record<string, string>}
 */
const characterEntities = {
  AElig: 'Æ',
  AMP: '&',
  Aacute: 'Á',
  Abreve: 'Ă',
  Acirc: 'Â',
  Acy: 'А',
  Afr: '𝔄',
  Agrave: 'À',
  Alpha: 'Α',
  Amacr: 'Ā',
  And: '⩓',
  Aogon: 'Ą',
  Aopf: '𝔸',
  ApplyFunction: '⁡',
  Aring: 'Å',
  Ascr: '𝒜',
  Assign: '≔',
  Atilde: 'Ã',
  Auml: 'Ä',
  Backslash: '∖',
  Barv: '⫧',
  Barwed: '⌆',
  Bcy: 'Б',
  Because: '∵',
  Bernoullis: 'ℬ',
  Beta: 'Β',
  Bfr: '𝔅',
  Bopf: '𝔹',
  Breve: '˘',
  Bscr: 'ℬ',
  Bumpeq: '≎',
  CHcy: 'Ч',
  COPY: '©',
  Cacute: 'Ć',
  Cap: '⋒',
  CapitalDifferentialD: 'ⅅ',
  Cayleys: 'ℭ',
  Ccaron: 'Č',
  Ccedil: 'Ç',
  Ccirc: 'Ĉ',
  Cconint: '∰',
  Cdot: 'Ċ',
  Cedilla: '¸',
  CenterDot: '·',
  Cfr: 'ℭ',
  Chi: 'Χ',
  CircleDot: '⊙',
  CircleMinus: '⊖',
  CirclePlus: '⊕',
  CircleTimes: '⊗',
  ClockwiseContourIntegral: '∲',
  CloseCurlyDoubleQuote: '”',
  CloseCurlyQuote: '’',
  Colon: '∷',
  Colone: '⩴',
  Congruent: '≡',
  Conint: '∯',
  ContourIntegral: '∮',
  Copf: 'ℂ',
  Coproduct: '∐',
  CounterClockwiseContourIntegral: '∳',
  Cross: '⨯',
  Cscr: '𝒞',
  Cup: '⋓',
  CupCap: '≍',
  DD: 'ⅅ',
  DDotrahd: '⤑',
  DJcy: 'Ђ',
  DScy: 'Ѕ',
  DZcy: 'Џ',
  Dagger: '‡',
  Darr: '↡',
  Dashv: '⫤',
  Dcaron: 'Ď',
  Dcy: 'Д',
  Del: '∇',
  Delta: 'Δ',
  Dfr: '𝔇',
  DiacriticalAcute: '´',
  DiacriticalDot: '˙',
  DiacriticalDoubleAcute: '˝',
  DiacriticalGrave: '`',
  DiacriticalTilde: '˜',
  Diamond: '⋄',
  DifferentialD: 'ⅆ',
  Dopf: '𝔻',
  Dot: '¨',
  DotDot: '⃜',
  DotEqual: '≐',
  DoubleContourIntegral: '∯',
  DoubleDot: '¨',
  DoubleDownArrow: '⇓',
  DoubleLeftArrow: '⇐',
  DoubleLeftRightArrow: '⇔',
  DoubleLeftTee: '⫤',
  DoubleLongLeftArrow: '⟸',
  DoubleLongLeftRightArrow: '⟺',
  DoubleLongRightArrow: '⟹',
  DoubleRightArrow: '⇒',
  DoubleRightTee: '⊨',
  DoubleUpArrow: '⇑',
  DoubleUpDownArrow: '⇕',
  DoubleVerticalBar: '∥',
  DownArrow: '↓',
  DownArrowBar: '⤓',
  DownArrowUpArrow: '⇵',
  DownBreve: '̑',
  DownLeftRightVector: '⥐',
  DownLeftTeeVector: '⥞',
  DownLeftVector: '↽',
  DownLeftVectorBar: '⥖',
  DownRightTeeVector: '⥟',
  DownRightVector: '⇁',
  DownRightVectorBar: '⥗',
  DownTee: '⊤',
  DownTeeArrow: '↧',
  Downarrow: '⇓',
  Dscr: '𝒟',
  Dstrok: 'Đ',
  ENG: 'Ŋ',
  ETH: 'Ð',
  Eacute: 'É',
  Ecaron: 'Ě',
  Ecirc: 'Ê',
  Ecy: 'Э',
  Edot: 'Ė',
  Efr: '𝔈',
  Egrave: 'È',
  Element: '∈',
  Emacr: 'Ē',
  EmptySmallSquare: '◻',
  EmptyVerySmallSquare: '▫',
  Eogon: 'Ę',
  Eopf: '𝔼',
  Epsilon: 'Ε',
  Equal: '⩵',
  EqualTilde: '≂',
  Equilibrium: '⇌',
  Escr: 'ℰ',
  Esim: '⩳',
  Eta: 'Η',
  Euml: 'Ë',
  Exists: '∃',
  ExponentialE: 'ⅇ',
  Fcy: 'Ф',
  Ffr: '𝔉',
  FilledSmallSquare: '◼',
  FilledVerySmallSquare: '▪',
  Fopf: '𝔽',
  ForAll: '∀',
  Fouriertrf: 'ℱ',
  Fscr: 'ℱ',
  GJcy: 'Ѓ',
  GT: '>',
  Gamma: 'Γ',
  Gammad: 'Ϝ',
  Gbreve: 'Ğ',
  Gcedil: 'Ģ',
  Gcirc: 'Ĝ',
  Gcy: 'Г',
  Gdot: 'Ġ',
  Gfr: '𝔊',
  Gg: '⋙',
  Gopf: '𝔾',
  GreaterEqual: '≥',
  GreaterEqualLess: '⋛',
  GreaterFullEqual: '≧',
  GreaterGreater: '⪢',
  GreaterLess: '≷',
  GreaterSlantEqual: '⩾',
  GreaterTilde: '≳',
  Gscr: '𝒢',
  Gt: '≫',
  HARDcy: 'Ъ',
  Hacek: 'ˇ',
  Hat: '^',
  Hcirc: 'Ĥ',
  Hfr: 'ℌ',
  HilbertSpace: 'ℋ',
  Hopf: 'ℍ',
  HorizontalLine: '─',
  Hscr: 'ℋ',
  Hstrok: 'Ħ',
  HumpDownHump: '≎',
  HumpEqual: '≏',
  IEcy: 'Е',
  IJlig: 'Ĳ',
  IOcy: 'Ё',
  Iacute: 'Í',
  Icirc: 'Î',
  Icy: 'И',
  Idot: 'İ',
  Ifr: 'ℑ',
  Igrave: 'Ì',
  Im: 'ℑ',
  Imacr: 'Ī',
  ImaginaryI: 'ⅈ',
  Implies: '⇒',
  Int: '∬',
  Integral: '∫',
  Intersection: '⋂',
  InvisibleComma: '⁣',
  InvisibleTimes: '⁢',
  Iogon: 'Į',
  Iopf: '𝕀',
  Iota: 'Ι',
  Iscr: 'ℐ',
  Itilde: 'Ĩ',
  Iukcy: 'І',
  Iuml: 'Ï',
  Jcirc: 'Ĵ',
  Jcy: 'Й',
  Jfr: '𝔍',
  Jopf: '𝕁',
  Jscr: '𝒥',
  Jsercy: 'Ј',
  Jukcy: 'Є',
  KHcy: 'Х',
  KJcy: 'Ќ',
  Kappa: 'Κ',
  Kcedil: 'Ķ',
  Kcy: 'К',
  Kfr: '𝔎',
  Kopf: '𝕂',
  Kscr: '𝒦',
  LJcy: 'Љ',
  LT: '<',
  Lacute: 'Ĺ',
  Lambda: 'Λ',
  Lang: '⟪',
  Laplacetrf: 'ℒ',
  Larr: '↞',
  Lcaron: 'Ľ',
  Lcedil: 'Ļ',
  Lcy: 'Л',
  LeftAngleBracket: '⟨',
  LeftArrow: '←',
  LeftArrowBar: '⇤',
  LeftArrowRightArrow: '⇆',
  LeftCeiling: '⌈',
  LeftDoubleBracket: '⟦',
  LeftDownTeeVector: '⥡',
  LeftDownVector: '⇃',
  LeftDownVectorBar: '⥙',
  LeftFloor: '⌊',
  LeftRightArrow: '↔',
  LeftRightVector: '⥎',
  LeftTee: '⊣',
  LeftTeeArrow: '↤',
  LeftTeeVector: '⥚',
  LeftTriangle: '⊲',
  LeftTriangleBar: '⧏',
  LeftTriangleEqual: '⊴',
  LeftUpDownVector: '⥑',
  LeftUpTeeVector: '⥠',
  LeftUpVector: '↿',
  LeftUpVectorBar: '⥘',
  LeftVector: '↼',
  LeftVectorBar: '⥒',
  Leftarrow: '⇐',
  Leftrightarrow: '⇔',
  LessEqualGreater: '⋚',
  LessFullEqual: '≦',
  LessGreater: '≶',
  LessLess: '⪡',
  LessSlantEqual: '⩽',
  LessTilde: '≲',
  Lfr: '𝔏',
  Ll: '⋘',
  Lleftarrow: '⇚',
  Lmidot: 'Ŀ',
  LongLeftArrow: '⟵',
  LongLeftRightArrow: '⟷',
  LongRightArrow: '⟶',
  Longleftarrow: '⟸',
  Longleftrightarrow: '⟺',
  Longrightarrow: '⟹',
  Lopf: '𝕃',
  LowerLeftArrow: '↙',
  LowerRightArrow: '↘',
  Lscr: 'ℒ',
  Lsh: '↰',
  Lstrok: 'Ł',
  Lt: '≪',
  Map: '⤅',
  Mcy: 'М',
  MediumSpace: ' ',
  Mellintrf: 'ℳ',
  Mfr: '𝔐',
  MinusPlus: '∓',
  Mopf: '𝕄',
  Mscr: 'ℳ',
  Mu: 'Μ',
  NJcy: 'Њ',
  Nacute: 'Ń',
  Ncaron: 'Ň',
  Ncedil: 'Ņ',
  Ncy: 'Н',
  NegativeMediumSpace: '​',
  NegativeThickSpace: '​',
  NegativeThinSpace: '​',
  NegativeVeryThinSpace: '​',
  NestedGreaterGreater: '≫',
  NestedLessLess: '≪',
  NewLine: '\n',
  Nfr: '𝔑',
  NoBreak: '⁠',
  NonBreakingSpace: ' ',
  Nopf: 'ℕ',
  Not: '⫬',
  NotCongruent: '≢',
  NotCupCap: '≭',
  NotDoubleVerticalBar: '∦',
  NotElement: '∉',
  NotEqual: '≠',
  NotEqualTilde: '≂̸',
  NotExists: '∄',
  NotGreater: '≯',
  NotGreaterEqual: '≱',
  NotGreaterFullEqual: '≧̸',
  NotGreaterGreater: '≫̸',
  NotGreaterLess: '≹',
  NotGreaterSlantEqual: '⩾̸',
  NotGreaterTilde: '≵',
  NotHumpDownHump: '≎̸',
  NotHumpEqual: '≏̸',
  NotLeftTriangle: '⋪',
  NotLeftTriangleBar: '⧏̸',
  NotLeftTriangleEqual: '⋬',
  NotLess: '≮',
  NotLessEqual: '≰',
  NotLessGreater: '≸',
  NotLessLess: '≪̸',
  NotLessSlantEqual: '⩽̸',
  NotLessTilde: '≴',
  NotNestedGreaterGreater: '⪢̸',
  NotNestedLessLess: '⪡̸',
  NotPrecedes: '⊀',
  NotPrecedesEqual: '⪯̸',
  NotPrecedesSlantEqual: '⋠',
  NotReverseElement: '∌',
  NotRightTriangle: '⋫',
  NotRightTriangleBar: '⧐̸',
  NotRightTriangleEqual: '⋭',
  NotSquareSubset: '⊏̸',
  NotSquareSubsetEqual: '⋢',
  NotSquareSuperset: '⊐̸',
  NotSquareSupersetEqual: '⋣',
  NotSubset: '⊂⃒',
  NotSubsetEqual: '⊈',
  NotSucceeds: '⊁',
  NotSucceedsEqual: '⪰̸',
  NotSucceedsSlantEqual: '⋡',
  NotSucceedsTilde: '≿̸',
  NotSuperset: '⊃⃒',
  NotSupersetEqual: '⊉',
  NotTilde: '≁',
  NotTildeEqual: '≄',
  NotTildeFullEqual: '≇',
  NotTildeTilde: '≉',
  NotVerticalBar: '∤',
  Nscr: '𝒩',
  Ntilde: 'Ñ',
  Nu: 'Ν',
  OElig: 'Œ',
  Oacute: 'Ó',
  Ocirc: 'Ô',
  Ocy: 'О',
  Odblac: 'Ő',
  Ofr: '𝔒',
  Ograve: 'Ò',
  Omacr: 'Ō',
  Omega: 'Ω',
  Omicron: 'Ο',
  Oopf: '𝕆',
  OpenCurlyDoubleQuote: '“',
  OpenCurlyQuote: '‘',
  Or: '⩔',
  Oscr: '𝒪',
  Oslash: 'Ø',
  Otilde: 'Õ',
  Otimes: '⨷',
  Ouml: 'Ö',
  OverBar: '‾',
  OverBrace: '⏞',
  OverBracket: '⎴',
  OverParenthesis: '⏜',
  PartialD: '∂',
  Pcy: 'П',
  Pfr: '𝔓',
  Phi: 'Φ',
  Pi: 'Π',
  PlusMinus: '±',
  Poincareplane: 'ℌ',
  Popf: 'ℙ',
  Pr: '⪻',
  Precedes: '≺',
  PrecedesEqual: '⪯',
  PrecedesSlantEqual: '≼',
  PrecedesTilde: '≾',
  Prime: '″',
  Product: '∏',
  Proportion: '∷',
  Proportional: '∝',
  Pscr: '𝒫',
  Psi: 'Ψ',
  QUOT: '"',
  Qfr: '𝔔',
  Qopf: 'ℚ',
  Qscr: '𝒬',
  RBarr: '⤐',
  REG: '®',
  Racute: 'Ŕ',
  Rang: '⟫',
  Rarr: '↠',
  Rarrtl: '⤖',
  Rcaron: 'Ř',
  Rcedil: 'Ŗ',
  Rcy: 'Р',
  Re: 'ℜ',
  ReverseElement: '∋',
  ReverseEquilibrium: '⇋',
  ReverseUpEquilibrium: '⥯',
  Rfr: 'ℜ',
  Rho: 'Ρ',
  RightAngleBracket: '⟩',
  RightArrow: '→',
  RightArrowBar: '⇥',
  RightArrowLeftArrow: '⇄',
  RightCeiling: '⌉',
  RightDoubleBracket: '⟧',
  RightDownTeeVector: '⥝',
  RightDownVector: '⇂',
  RightDownVectorBar: '⥕',
  RightFloor: '⌋',
  RightTee: '⊢',
  RightTeeArrow: '↦',
  RightTeeVector: '⥛',
  RightTriangle: '⊳',
  RightTriangleBar: '⧐',
  RightTriangleEqual: '⊵',
  RightUpDownVector: '⥏',
  RightUpTeeVector: '⥜',
  RightUpVector: '↾',
  RightUpVectorBar: '⥔',
  RightVector: '⇀',
  RightVectorBar: '⥓',
  Rightarrow: '⇒',
  Ropf: 'ℝ',
  RoundImplies: '⥰',
  Rrightarrow: '⇛',
  Rscr: 'ℛ',
  Rsh: '↱',
  RuleDelayed: '⧴',
  SHCHcy: 'Щ',
  SHcy: 'Ш',
  SOFTcy: 'Ь',
  Sacute: 'Ś',
  Sc: '⪼',
  Scaron: 'Š',
  Scedil: 'Ş',
  Scirc: 'Ŝ',
  Scy: 'С',
  Sfr: '𝔖',
  ShortDownArrow: '↓',
  ShortLeftArrow: '←',
  ShortRightArrow: '→',
  ShortUpArrow: '↑',
  Sigma: 'Σ',
  SmallCircle: '∘',
  Sopf: '𝕊',
  Sqrt: '√',
  Square: '□',
  SquareIntersection: '⊓',
  SquareSubset: '⊏',
  SquareSubsetEqual: '⊑',
  SquareSuperset: '⊐',
  SquareSupersetEqual: '⊒',
  SquareUnion: '⊔',
  Sscr: '𝒮',
  Star: '⋆',
  Sub: '⋐',
  Subset: '⋐',
  SubsetEqual: '⊆',
  Succeeds: '≻',
  SucceedsEqual: '⪰',
  SucceedsSlantEqual: '≽',
  SucceedsTilde: '≿',
  SuchThat: '∋',
  Sum: '∑',
  Sup: '⋑',
  Superset: '⊃',
  SupersetEqual: '⊇',
  Supset: '⋑',
  THORN: 'Þ',
  TRADE: '™',
  TSHcy: 'Ћ',
  TScy: 'Ц',
  Tab: '\t',
  Tau: 'Τ',
  Tcaron: 'Ť',
  Tcedil: 'Ţ',
  Tcy: 'Т',
  Tfr: '𝔗',
  Therefore: '∴',
  Theta: 'Θ',
  ThickSpace: '  ',
  ThinSpace: ' ',
  Tilde: '∼',
  TildeEqual: '≃',
  TildeFullEqual: '≅',
  TildeTilde: '≈',
  Topf: '𝕋',
  TripleDot: '⃛',
  Tscr: '𝒯',
  Tstrok: 'Ŧ',
  Uacute: 'Ú',
  Uarr: '↟',
  Uarrocir: '⥉',
  Ubrcy: 'Ў',
  Ubreve: 'Ŭ',
  Ucirc: 'Û',
  Ucy: 'У',
  Udblac: 'Ű',
  Ufr: '𝔘',
  Ugrave: 'Ù',
  Umacr: 'Ū',
  UnderBar: '_',
  UnderBrace: '⏟',
  UnderBracket: '⎵',
  UnderParenthesis: '⏝',
  Union: '⋃',
  UnionPlus: '⊎',
  Uogon: 'Ų',
  Uopf: '𝕌',
  UpArrow: '↑',
  UpArrowBar: '⤒',
  UpArrowDownArrow: '⇅',
  UpDownArrow: '↕',
  UpEquilibrium: '⥮',
  UpTee: '⊥',
  UpTeeArrow: '↥',
  Uparrow: '⇑',
  Updownarrow: '⇕',
  UpperLeftArrow: '↖',
  UpperRightArrow: '↗',
  Upsi: 'ϒ',
  Upsilon: 'Υ',
  Uring: 'Ů',
  Uscr: '𝒰',
  Utilde: 'Ũ',
  Uuml: 'Ü',
  VDash: '⊫',
  Vbar: '⫫',
  Vcy: 'В',
  Vdash: '⊩',
  Vdashl: '⫦',
  Vee: '⋁',
  Verbar: '‖',
  Vert: '‖',
  VerticalBar: '∣',
  VerticalLine: '|',
  VerticalSeparator: '❘',
  VerticalTilde: '≀',
  VeryThinSpace: ' ',
  Vfr: '𝔙',
  Vopf: '𝕍',
  Vscr: '𝒱',
  Vvdash: '⊪',
  Wcirc: 'Ŵ',
  Wedge: '⋀',
  Wfr: '𝔚',
  Wopf: '𝕎',
  Wscr: '𝒲',
  Xfr: '𝔛',
  Xi: 'Ξ',
  Xopf: '𝕏',
  Xscr: '𝒳',
  YAcy: 'Я',
  YIcy: 'Ї',
  YUcy: 'Ю',
  Yacute: 'Ý',
  Ycirc: 'Ŷ',
  Ycy: 'Ы',
  Yfr: '𝔜',
  Yopf: '𝕐',
  Yscr: '𝒴',
  Yuml: 'Ÿ',
  ZHcy: 'Ж',
  Zacute: 'Ź',
  Zcaron: 'Ž',
  Zcy: 'З',
  Zdot: 'Ż',
  ZeroWidthSpace: '​',
  Zeta: 'Ζ',
  Zfr: 'ℨ',
  Zopf: 'ℤ',
  Zscr: '𝒵',
  aacute: 'á',
  abreve: 'ă',
  ac: '∾',
  acE: '∾̳',
  acd: '∿',
  acirc: 'â',
  acute: '´',
  acy: 'а',
  aelig: 'æ',
  af: '⁡',
  afr: '𝔞',
  agrave: 'à',
  alefsym: 'ℵ',
  aleph: 'ℵ',
  alpha: 'α',
  amacr: 'ā',
  amalg: '⨿',
  amp: '&',
  and: '∧',
  andand: '⩕',
  andd: '⩜',
  andslope: '⩘',
  andv: '⩚',
  ang: '∠',
  ange: '⦤',
  angle: '∠',
  angmsd: '∡',
  angmsdaa: '⦨',
  angmsdab: '⦩',
  angmsdac: '⦪',
  angmsdad: '⦫',
  angmsdae: '⦬',
  angmsdaf: '⦭',
  angmsdag: '⦮',
  angmsdah: '⦯',
  angrt: '∟',
  angrtvb: '⊾',
  angrtvbd: '⦝',
  angsph: '∢',
  angst: 'Å',
  angzarr: '⍼',
  aogon: 'ą',
  aopf: '𝕒',
  ap: '≈',
  apE: '⩰',
  apacir: '⩯',
  ape: '≊',
  apid: '≋',
  apos: "'",
  approx: '≈',
  approxeq: '≊',
  aring: 'å',
  ascr: '𝒶',
  ast: '*',
  asymp: '≈',
  asympeq: '≍',
  atilde: 'ã',
  auml: 'ä',
  awconint: '∳',
  awint: '⨑',
  bNot: '⫭',
  backcong: '≌',
  backepsilon: '϶',
  backprime: '‵',
  backsim: '∽',
  backsimeq: '⋍',
  barvee: '⊽',
  barwed: '⌅',
  barwedge: '⌅',
  bbrk: '⎵',
  bbrktbrk: '⎶',
  bcong: '≌',
  bcy: 'б',
  bdquo: '„',
  becaus: '∵',
  because: '∵',
  bemptyv: '⦰',
  bepsi: '϶',
  bernou: 'ℬ',
  beta: 'β',
  beth: 'ℶ',
  between: '≬',
  bfr: '𝔟',
  bigcap: '⋂',
  bigcirc: '◯',
  bigcup: '⋃',
  bigodot: '⨀',
  bigoplus: '⨁',
  bigotimes: '⨂',
  bigsqcup: '⨆',
  bigstar: '★',
  bigtriangledown: '▽',
  bigtriangleup: '△',
  biguplus: '⨄',
  bigvee: '⋁',
  bigwedge: '⋀',
  bkarow: '⤍',
  blacklozenge: '⧫',
  blacksquare: '▪',
  blacktriangle: '▴',
  blacktriangledown: '▾',
  blacktriangleleft: '◂',
  blacktriangleright: '▸',
  blank: '␣',
  blk12: '▒',
  blk14: '░',
  blk34: '▓',
  block: '█',
  bne: '=⃥',
  bnequiv: '≡⃥',
  bnot: '⌐',
  bopf: '𝕓',
  bot: '⊥',
  bottom: '⊥',
  bowtie: '⋈',
  boxDL: '╗',
  boxDR: '╔',
  boxDl: '╖',
  boxDr: '╓',
  boxH: '═',
  boxHD: '╦',
  boxHU: '╩',
  boxHd: '╤',
  boxHu: '╧',
  boxUL: '╝',
  boxUR: '╚',
  boxUl: '╜',
  boxUr: '╙',
  boxV: '║',
  boxVH: '╬',
  boxVL: '╣',
  boxVR: '╠',
  boxVh: '╫',
  boxVl: '╢',
  boxVr: '╟',
  boxbox: '⧉',
  boxdL: '╕',
  boxdR: '╒',
  boxdl: '┐',
  boxdr: '┌',
  boxh: '─',
  boxhD: '╥',
  boxhU: '╨',
  boxhd: '┬',
  boxhu: '┴',
  boxminus: '⊟',
  boxplus: '⊞',
  boxtimes: '⊠',
  boxuL: '╛',
  boxuR: '╘',
  boxul: '┘',
  boxur: '└',
  boxv: '│',
  boxvH: '╪',
  boxvL: '╡',
  boxvR: '╞',
  boxvh: '┼',
  boxvl: '┤',
  boxvr: '├',
  bprime: '‵',
  breve: '˘',
  brvbar: '¦',
  bscr: '𝒷',
  bsemi: '⁏',
  bsim: '∽',
  bsime: '⋍',
  bsol: '\\',
  bsolb: '⧅',
  bsolhsub: '⟈',
  bull: '•',
  bullet: '•',
  bump: '≎',
  bumpE: '⪮',
  bumpe: '≏',
  bumpeq: '≏',
  cacute: 'ć',
  cap: '∩',
  capand: '⩄',
  capbrcup: '⩉',
  capcap: '⩋',
  capcup: '⩇',
  capdot: '⩀',
  caps: '∩︀',
  caret: '⁁',
  caron: 'ˇ',
  ccaps: '⩍',
  ccaron: 'č',
  ccedil: 'ç',
  ccirc: 'ĉ',
  ccups: '⩌',
  ccupssm: '⩐',
  cdot: 'ċ',
  cedil: '¸',
  cemptyv: '⦲',
  cent: '¢',
  centerdot: '·',
  cfr: '𝔠',
  chcy: 'ч',
  check: '✓',
  checkmark: '✓',
  chi: 'χ',
  cir: '○',
  cirE: '⧃',
  circ: 'ˆ',
  circeq: '≗',
  circlearrowleft: '↺',
  circlearrowright: '↻',
  circledR: '®',
  circledS: 'Ⓢ',
  circledast: '⊛',
  circledcirc: '⊚',
  circleddash: '⊝',
  cire: '≗',
  cirfnint: '⨐',
  cirmid: '⫯',
  cirscir: '⧂',
  clubs: '♣',
  clubsuit: '♣',
  colon: ':',
  colone: '≔',
  coloneq: '≔',
  comma: ',',
  commat: '@',
  comp: '∁',
  compfn: '∘',
  complement: '∁',
  complexes: 'ℂ',
  cong: '≅',
  congdot: '⩭',
  conint: '∮',
  copf: '𝕔',
  coprod: '∐',
  copy: '©',
  copysr: '℗',
  crarr: '↵',
  cross: '✗',
  cscr: '𝒸',
  csub: '⫏',
  csube: '⫑',
  csup: '⫐',
  csupe: '⫒',
  ctdot: '⋯',
  cudarrl: '⤸',
  cudarrr: '⤵',
  cuepr: '⋞',
  cuesc: '⋟',
  cularr: '↶',
  cularrp: '⤽',
  cup: '∪',
  cupbrcap: '⩈',
  cupcap: '⩆',
  cupcup: '⩊',
  cupdot: '⊍',
  cupor: '⩅',
  cups: '∪︀',
  curarr: '↷',
  curarrm: '⤼',
  curlyeqprec: '⋞',
  curlyeqsucc: '⋟',
  curlyvee: '⋎',
  curlywedge: '⋏',
  curren: '¤',
  curvearrowleft: '↶',
  curvearrowright: '↷',
  cuvee: '⋎',
  cuwed: '⋏',
  cwconint: '∲',
  cwint: '∱',
  cylcty: '⌭',
  dArr: '⇓',
  dHar: '⥥',
  dagger: '†',
  daleth: 'ℸ',
  darr: '↓',
  dash: '‐',
  dashv: '⊣',
  dbkarow: '⤏',
  dblac: '˝',
  dcaron: 'ď',
  dcy: 'д',
  dd: 'ⅆ',
  ddagger: '‡',
  ddarr: '⇊',
  ddotseq: '⩷',
  deg: '°',
  delta: 'δ',
  demptyv: '⦱',
  dfisht: '⥿',
  dfr: '𝔡',
  dharl: '⇃',
  dharr: '⇂',
  diam: '⋄',
  diamond: '⋄',
  diamondsuit: '♦',
  diams: '♦',
  die: '¨',
  digamma: 'ϝ',
  disin: '⋲',
  div: '÷',
  divide: '÷',
  divideontimes: '⋇',
  divonx: '⋇',
  djcy: 'ђ',
  dlcorn: '⌞',
  dlcrop: '⌍',
  dollar: '$',
  dopf: '𝕕',
  dot: '˙',
  doteq: '≐',
  doteqdot: '≑',
  dotminus: '∸',
  dotplus: '∔',
  dotsquare: '⊡',
  doublebarwedge: '⌆',
  downarrow: '↓',
  downdownarrows: '⇊',
  downharpoonleft: '⇃',
  downharpoonright: '⇂',
  drbkarow: '⤐',
  drcorn: '⌟',
  drcrop: '⌌',
  dscr: '𝒹',
  dscy: 'ѕ',
  dsol: '⧶',
  dstrok: 'đ',
  dtdot: '⋱',
  dtri: '▿',
  dtrif: '▾',
  duarr: '⇵',
  duhar: '⥯',
  dwangle: '⦦',
  dzcy: 'џ',
  dzigrarr: '⟿',
  eDDot: '⩷',
  eDot: '≑',
  eacute: 'é',
  easter: '⩮',
  ecaron: 'ě',
  ecir: '≖',
  ecirc: 'ê',
  ecolon: '≕',
  ecy: 'э',
  edot: 'ė',
  ee: 'ⅇ',
  efDot: '≒',
  efr: '𝔢',
  eg: '⪚',
  egrave: 'è',
  egs: '⪖',
  egsdot: '⪘',
  el: '⪙',
  elinters: '⏧',
  ell: 'ℓ',
  els: '⪕',
  elsdot: '⪗',
  emacr: 'ē',
  empty: '∅',
  emptyset: '∅',
  emptyv: '∅',
  emsp13: ' ',
  emsp14: ' ',
  emsp: ' ',
  eng: 'ŋ',
  ensp: ' ',
  eogon: 'ę',
  eopf: '𝕖',
  epar: '⋕',
  eparsl: '⧣',
  eplus: '⩱',
  epsi: 'ε',
  epsilon: 'ε',
  epsiv: 'ϵ',
  eqcirc: '≖',
  eqcolon: '≕',
  eqsim: '≂',
  eqslantgtr: '⪖',
  eqslantless: '⪕',
  equals: '=',
  equest: '≟',
  equiv: '≡',
  equivDD: '⩸',
  eqvparsl: '⧥',
  erDot: '≓',
  erarr: '⥱',
  escr: 'ℯ',
  esdot: '≐',
  esim: '≂',
  eta: 'η',
  eth: 'ð',
  euml: 'ë',
  euro: '€',
  excl: '!',
  exist: '∃',
  expectation: 'ℰ',
  exponentiale: 'ⅇ',
  fallingdotseq: '≒',
  fcy: 'ф',
  female: '♀',
  ffilig: 'ﬃ',
  fflig: 'ﬀ',
  ffllig: 'ﬄ',
  ffr: '𝔣',
  filig: 'ﬁ',
  fjlig: 'fj',
  flat: '♭',
  fllig: 'ﬂ',
  fltns: '▱',
  fnof: 'ƒ',
  fopf: '𝕗',
  forall: '∀',
  fork: '⋔',
  forkv: '⫙',
  fpartint: '⨍',
  frac12: '½',
  frac13: '⅓',
  frac14: '¼',
  frac15: '⅕',
  frac16: '⅙',
  frac18: '⅛',
  frac23: '⅔',
  frac25: '⅖',
  frac34: '¾',
  frac35: '⅗',
  frac38: '⅜',
  frac45: '⅘',
  frac56: '⅚',
  frac58: '⅝',
  frac78: '⅞',
  frasl: '⁄',
  frown: '⌢',
  fscr: '𝒻',
  gE: '≧',
  gEl: '⪌',
  gacute: 'ǵ',
  gamma: 'γ',
  gammad: 'ϝ',
  gap: '⪆',
  gbreve: 'ğ',
  gcirc: 'ĝ',
  gcy: 'г',
  gdot: 'ġ',
  ge: '≥',
  gel: '⋛',
  geq: '≥',
  geqq: '≧',
  geqslant: '⩾',
  ges: '⩾',
  gescc: '⪩',
  gesdot: '⪀',
  gesdoto: '⪂',
  gesdotol: '⪄',
  gesl: '⋛︀',
  gesles: '⪔',
  gfr: '𝔤',
  gg: '≫',
  ggg: '⋙',
  gimel: 'ℷ',
  gjcy: 'ѓ',
  gl: '≷',
  glE: '⪒',
  gla: '⪥',
  glj: '⪤',
  gnE: '≩',
  gnap: '⪊',
  gnapprox: '⪊',
  gne: '⪈',
  gneq: '⪈',
  gneqq: '≩',
  gnsim: '⋧',
  gopf: '𝕘',
  grave: '`',
  gscr: 'ℊ',
  gsim: '≳',
  gsime: '⪎',
  gsiml: '⪐',
  gt: '>',
  gtcc: '⪧',
  gtcir: '⩺',
  gtdot: '⋗',
  gtlPar: '⦕',
  gtquest: '⩼',
  gtrapprox: '⪆',
  gtrarr: '⥸',
  gtrdot: '⋗',
  gtreqless: '⋛',
  gtreqqless: '⪌',
  gtrless: '≷',
  gtrsim: '≳',
  gvertneqq: '≩︀',
  gvnE: '≩︀',
  hArr: '⇔',
  hairsp: ' ',
  half: '½',
  hamilt: 'ℋ',
  hardcy: 'ъ',
  harr: '↔',
  harrcir: '⥈',
  harrw: '↭',
  hbar: 'ℏ',
  hcirc: 'ĥ',
  hearts: '♥',
  heartsuit: '♥',
  hellip: '…',
  hercon: '⊹',
  hfr: '𝔥',
  hksearow: '⤥',
  hkswarow: '⤦',
  hoarr: '⇿',
  homtht: '∻',
  hookleftarrow: '↩',
  hookrightarrow: '↪',
  hopf: '𝕙',
  horbar: '―',
  hscr: '𝒽',
  hslash: 'ℏ',
  hstrok: 'ħ',
  hybull: '⁃',
  hyphen: '‐',
  iacute: 'í',
  ic: '⁣',
  icirc: 'î',
  icy: 'и',
  iecy: 'е',
  iexcl: '¡',
  iff: '⇔',
  ifr: '𝔦',
  igrave: 'ì',
  ii: 'ⅈ',
  iiiint: '⨌',
  iiint: '∭',
  iinfin: '⧜',
  iiota: '℩',
  ijlig: 'ĳ',
  imacr: 'ī',
  image: 'ℑ',
  imagline: 'ℐ',
  imagpart: 'ℑ',
  imath: 'ı',
  imof: '⊷',
  imped: 'Ƶ',
  in: '∈',
  incare: '℅',
  infin: '∞',
  infintie: '⧝',
  inodot: 'ı',
  int: '∫',
  intcal: '⊺',
  integers: 'ℤ',
  intercal: '⊺',
  intlarhk: '⨗',
  intprod: '⨼',
  iocy: 'ё',
  iogon: 'į',
  iopf: '𝕚',
  iota: 'ι',
  iprod: '⨼',
  iquest: '¿',
  iscr: '𝒾',
  isin: '∈',
  isinE: '⋹',
  isindot: '⋵',
  isins: '⋴',
  isinsv: '⋳',
  isinv: '∈',
  it: '⁢',
  itilde: 'ĩ',
  iukcy: 'і',
  iuml: 'ï',
  jcirc: 'ĵ',
  jcy: 'й',
  jfr: '𝔧',
  jmath: 'ȷ',
  jopf: '𝕛',
  jscr: '𝒿',
  jsercy: 'ј',
  jukcy: 'є',
  kappa: 'κ',
  kappav: 'ϰ',
  kcedil: 'ķ',
  kcy: 'к',
  kfr: '𝔨',
  kgreen: 'ĸ',
  khcy: 'х',
  kjcy: 'ќ',
  kopf: '𝕜',
  kscr: '𝓀',
  lAarr: '⇚',
  lArr: '⇐',
  lAtail: '⤛',
  lBarr: '⤎',
  lE: '≦',
  lEg: '⪋',
  lHar: '⥢',
  lacute: 'ĺ',
  laemptyv: '⦴',
  lagran: 'ℒ',
  lambda: 'λ',
  lang: '⟨',
  langd: '⦑',
  langle: '⟨',
  lap: '⪅',
  laquo: '«',
  larr: '←',
  larrb: '⇤',
  larrbfs: '⤟',
  larrfs: '⤝',
  larrhk: '↩',
  larrlp: '↫',
  larrpl: '⤹',
  larrsim: '⥳',
  larrtl: '↢',
  lat: '⪫',
  latail: '⤙',
  late: '⪭',
  lates: '⪭︀',
  lbarr: '⤌',
  lbbrk: '❲',
  lbrace: '{',
  lbrack: '[',
  lbrke: '⦋',
  lbrksld: '⦏',
  lbrkslu: '⦍',
  lcaron: 'ľ',
  lcedil: 'ļ',
  lceil: '⌈',
  lcub: '{',
  lcy: 'л',
  ldca: '⤶',
  ldquo: '“',
  ldquor: '„',
  ldrdhar: '⥧',
  ldrushar: '⥋',
  ldsh: '↲',
  le: '≤',
  leftarrow: '←',
  leftarrowtail: '↢',
  leftharpoondown: '↽',
  leftharpoonup: '↼',
  leftleftarrows: '⇇',
  leftrightarrow: '↔',
  leftrightarrows: '⇆',
  leftrightharpoons: '⇋',
  leftrightsquigarrow: '↭',
  leftthreetimes: '⋋',
  leg: '⋚',
  leq: '≤',
  leqq: '≦',
  leqslant: '⩽',
  les: '⩽',
  lescc: '⪨',
  lesdot: '⩿',
  lesdoto: '⪁',
  lesdotor: '⪃',
  lesg: '⋚︀',
  lesges: '⪓',
  lessapprox: '⪅',
  lessdot: '⋖',
  lesseqgtr: '⋚',
  lesseqqgtr: '⪋',
  lessgtr: '≶',
  lesssim: '≲',
  lfisht: '⥼',
  lfloor: '⌊',
  lfr: '𝔩',
  lg: '≶',
  lgE: '⪑',
  lhard: '↽',
  lharu: '↼',
  lharul: '⥪',
  lhblk: '▄',
  ljcy: 'љ',
  ll: '≪',
  llarr: '⇇',
  llcorner: '⌞',
  llhard: '⥫',
  lltri: '◺',
  lmidot: 'ŀ',
  lmoust: '⎰',
  lmoustache: '⎰',
  lnE: '≨',
  lnap: '⪉',
  lnapprox: '⪉',
  lne: '⪇',
  lneq: '⪇',
  lneqq: '≨',
  lnsim: '⋦',
  loang: '⟬',
  loarr: '⇽',
  lobrk: '⟦',
  longleftarrow: '⟵',
  longleftrightarrow: '⟷',
  longmapsto: '⟼',
  longrightarrow: '⟶',
  looparrowleft: '↫',
  looparrowright: '↬',
  lopar: '⦅',
  lopf: '𝕝',
  loplus: '⨭',
  lotimes: '⨴',
  lowast: '∗',
  lowbar: '_',
  loz: '◊',
  lozenge: '◊',
  lozf: '⧫',
  lpar: '(',
  lparlt: '⦓',
  lrarr: '⇆',
  lrcorner: '⌟',
  lrhar: '⇋',
  lrhard: '⥭',
  lrm: '‎',
  lrtri: '⊿',
  lsaquo: '‹',
  lscr: '𝓁',
  lsh: '↰',
  lsim: '≲',
  lsime: '⪍',
  lsimg: '⪏',
  lsqb: '[',
  lsquo: '‘',
  lsquor: '‚',
  lstrok: 'ł',
  lt: '<',
  ltcc: '⪦',
  ltcir: '⩹',
  ltdot: '⋖',
  lthree: '⋋',
  ltimes: '⋉',
  ltlarr: '⥶',
  ltquest: '⩻',
  ltrPar: '⦖',
  ltri: '◃',
  ltrie: '⊴',
  ltrif: '◂',
  lurdshar: '⥊',
  luruhar: '⥦',
  lvertneqq: '≨︀',
  lvnE: '≨︀',
  mDDot: '∺',
  macr: '¯',
  male: '♂',
  malt: '✠',
  maltese: '✠',
  map: '↦',
  mapsto: '↦',
  mapstodown: '↧',
  mapstoleft: '↤',
  mapstoup: '↥',
  marker: '▮',
  mcomma: '⨩',
  mcy: 'м',
  mdash: '—',
  measuredangle: '∡',
  mfr: '𝔪',
  mho: '℧',
  micro: 'µ',
  mid: '∣',
  midast: '*',
  midcir: '⫰',
  middot: '·',
  minus: '−',
  minusb: '⊟',
  minusd: '∸',
  minusdu: '⨪',
  mlcp: '⫛',
  mldr: '…',
  mnplus: '∓',
  models: '⊧',
  mopf: '𝕞',
  mp: '∓',
  mscr: '𝓂',
  mstpos: '∾',
  mu: 'μ',
  multimap: '⊸',
  mumap: '⊸',
  nGg: '⋙̸',
  nGt: '≫⃒',
  nGtv: '≫̸',
  nLeftarrow: '⇍',
  nLeftrightarrow: '⇎',
  nLl: '⋘̸',
  nLt: '≪⃒',
  nLtv: '≪̸',
  nRightarrow: '⇏',
  nVDash: '⊯',
  nVdash: '⊮',
  nabla: '∇',
  nacute: 'ń',
  nang: '∠⃒',
  nap: '≉',
  napE: '⩰̸',
  napid: '≋̸',
  napos: 'ŉ',
  napprox: '≉',
  natur: '♮',
  natural: '♮',
  naturals: 'ℕ',
  nbsp: ' ',
  nbump: '≎̸',
  nbumpe: '≏̸',
  ncap: '⩃',
  ncaron: 'ň',
  ncedil: 'ņ',
  ncong: '≇',
  ncongdot: '⩭̸',
  ncup: '⩂',
  ncy: 'н',
  ndash: '–',
  ne: '≠',
  neArr: '⇗',
  nearhk: '⤤',
  nearr: '↗',
  nearrow: '↗',
  nedot: '≐̸',
  nequiv: '≢',
  nesear: '⤨',
  nesim: '≂̸',
  nexist: '∄',
  nexists: '∄',
  nfr: '𝔫',
  ngE: '≧̸',
  nge: '≱',
  ngeq: '≱',
  ngeqq: '≧̸',
  ngeqslant: '⩾̸',
  nges: '⩾̸',
  ngsim: '≵',
  ngt: '≯',
  ngtr: '≯',
  nhArr: '⇎',
  nharr: '↮',
  nhpar: '⫲',
  ni: '∋',
  nis: '⋼',
  nisd: '⋺',
  niv: '∋',
  njcy: 'њ',
  nlArr: '⇍',
  nlE: '≦̸',
  nlarr: '↚',
  nldr: '‥',
  nle: '≰',
  nleftarrow: '↚',
  nleftrightarrow: '↮',
  nleq: '≰',
  nleqq: '≦̸',
  nleqslant: '⩽̸',
  nles: '⩽̸',
  nless: '≮',
  nlsim: '≴',
  nlt: '≮',
  nltri: '⋪',
  nltrie: '⋬',
  nmid: '∤',
  nopf: '𝕟',
  not: '¬',
  notin: '∉',
  notinE: '⋹̸',
  notindot: '⋵̸',
  notinva: '∉',
  notinvb: '⋷',
  notinvc: '⋶',
  notni: '∌',
  notniva: '∌',
  notnivb: '⋾',
  notnivc: '⋽',
  npar: '∦',
  nparallel: '∦',
  nparsl: '⫽⃥',
  npart: '∂̸',
  npolint: '⨔',
  npr: '⊀',
  nprcue: '⋠',
  npre: '⪯̸',
  nprec: '⊀',
  npreceq: '⪯̸',
  nrArr: '⇏',
  nrarr: '↛',
  nrarrc: '⤳̸',
  nrarrw: '↝̸',
  nrightarrow: '↛',
  nrtri: '⋫',
  nrtrie: '⋭',
  nsc: '⊁',
  nsccue: '⋡',
  nsce: '⪰̸',
  nscr: '𝓃',
  nshortmid: '∤',
  nshortparallel: '∦',
  nsim: '≁',
  nsime: '≄',
  nsimeq: '≄',
  nsmid: '∤',
  nspar: '∦',
  nsqsube: '⋢',
  nsqsupe: '⋣',
  nsub: '⊄',
  nsubE: '⫅̸',
  nsube: '⊈',
  nsubset: '⊂⃒',
  nsubseteq: '⊈',
  nsubseteqq: '⫅̸',
  nsucc: '⊁',
  nsucceq: '⪰̸',
  nsup: '⊅',
  nsupE: '⫆̸',
  nsupe: '⊉',
  nsupset: '⊃⃒',
  nsupseteq: '⊉',
  nsupseteqq: '⫆̸',
  ntgl: '≹',
  ntilde: 'ñ',
  ntlg: '≸',
  ntriangleleft: '⋪',
  ntrianglelefteq: '⋬',
  ntriangleright: '⋫',
  ntrianglerighteq: '⋭',
  nu: 'ν',
  num: '#',
  numero: '№',
  numsp: ' ',
  nvDash: '⊭',
  nvHarr: '⤄',
  nvap: '≍⃒',
  nvdash: '⊬',
  nvge: '≥⃒',
  nvgt: '>⃒',
  nvinfin: '⧞',
  nvlArr: '⤂',
  nvle: '≤⃒',
  nvlt: '<⃒',
  nvltrie: '⊴⃒',
  nvrArr: '⤃',
  nvrtrie: '⊵⃒',
  nvsim: '∼⃒',
  nwArr: '⇖',
  nwarhk: '⤣',
  nwarr: '↖',
  nwarrow: '↖',
  nwnear: '⤧',
  oS: 'Ⓢ',
  oacute: 'ó',
  oast: '⊛',
  ocir: '⊚',
  ocirc: 'ô',
  ocy: 'о',
  odash: '⊝',
  odblac: 'ő',
  odiv: '⨸',
  odot: '⊙',
  odsold: '⦼',
  oelig: 'œ',
  ofcir: '⦿',
  ofr: '𝔬',
  ogon: '˛',
  ograve: 'ò',
  ogt: '⧁',
  ohbar: '⦵',
  ohm: 'Ω',
  oint: '∮',
  olarr: '↺',
  olcir: '⦾',
  olcross: '⦻',
  oline: '‾',
  olt: '⧀',
  omacr: 'ō',
  omega: 'ω',
  omicron: 'ο',
  omid: '⦶',
  ominus: '⊖',
  oopf: '𝕠',
  opar: '⦷',
  operp: '⦹',
  oplus: '⊕',
  or: '∨',
  orarr: '↻',
  ord: '⩝',
  order: 'ℴ',
  orderof: 'ℴ',
  ordf: 'ª',
  ordm: 'º',
  origof: '⊶',
  oror: '⩖',
  orslope: '⩗',
  orv: '⩛',
  oscr: 'ℴ',
  oslash: 'ø',
  osol: '⊘',
  otilde: 'õ',
  otimes: '⊗',
  otimesas: '⨶',
  ouml: 'ö',
  ovbar: '⌽',
  par: '∥',
  para: '¶',
  parallel: '∥',
  parsim: '⫳',
  parsl: '⫽',
  part: '∂',
  pcy: 'п',
  percnt: '%',
  period: '.',
  permil: '‰',
  perp: '⊥',
  pertenk: '‱',
  pfr: '𝔭',
  phi: 'φ',
  phiv: 'ϕ',
  phmmat: 'ℳ',
  phone: '☎',
  pi: 'π',
  pitchfork: '⋔',
  piv: 'ϖ',
  planck: 'ℏ',
  planckh: 'ℎ',
  plankv: 'ℏ',
  plus: '+',
  plusacir: '⨣',
  plusb: '⊞',
  pluscir: '⨢',
  plusdo: '∔',
  plusdu: '⨥',
  pluse: '⩲',
  plusmn: '±',
  plussim: '⨦',
  plustwo: '⨧',
  pm: '±',
  pointint: '⨕',
  popf: '𝕡',
  pound: '£',
  pr: '≺',
  prE: '⪳',
  prap: '⪷',
  prcue: '≼',
  pre: '⪯',
  prec: '≺',
  precapprox: '⪷',
  preccurlyeq: '≼',
  preceq: '⪯',
  precnapprox: '⪹',
  precneqq: '⪵',
  precnsim: '⋨',
  precsim: '≾',
  prime: '′',
  primes: 'ℙ',
  prnE: '⪵',
  prnap: '⪹',
  prnsim: '⋨',
  prod: '∏',
  profalar: '⌮',
  profline: '⌒',
  profsurf: '⌓',
  prop: '∝',
  propto: '∝',
  prsim: '≾',
  prurel: '⊰',
  pscr: '𝓅',
  psi: 'ψ',
  puncsp: ' ',
  qfr: '𝔮',
  qint: '⨌',
  qopf: '𝕢',
  qprime: '⁗',
  qscr: '𝓆',
  quaternions: 'ℍ',
  quatint: '⨖',
  quest: '?',
  questeq: '≟',
  quot: '"',
  rAarr: '⇛',
  rArr: '⇒',
  rAtail: '⤜',
  rBarr: '⤏',
  rHar: '⥤',
  race: '∽̱',
  racute: 'ŕ',
  radic: '√',
  raemptyv: '⦳',
  rang: '⟩',
  rangd: '⦒',
  range: '⦥',
  rangle: '⟩',
  raquo: '»',
  rarr: '→',
  rarrap: '⥵',
  rarrb: '⇥',
  rarrbfs: '⤠',
  rarrc: '⤳',
  rarrfs: '⤞',
  rarrhk: '↪',
  rarrlp: '↬',
  rarrpl: '⥅',
  rarrsim: '⥴',
  rarrtl: '↣',
  rarrw: '↝',
  ratail: '⤚',
  ratio: '∶',
  rationals: 'ℚ',
  rbarr: '⤍',
  rbbrk: '❳',
  rbrace: '}',
  rbrack: ']',
  rbrke: '⦌',
  rbrksld: '⦎',
  rbrkslu: '⦐',
  rcaron: 'ř',
  rcedil: 'ŗ',
  rceil: '⌉',
  rcub: '}',
  rcy: 'р',
  rdca: '⤷',
  rdldhar: '⥩',
  rdquo: '”',
  rdquor: '”',
  rdsh: '↳',
  real: 'ℜ',
  realine: 'ℛ',
  realpart: 'ℜ',
  reals: 'ℝ',
  rect: '▭',
  reg: '®',
  rfisht: '⥽',
  rfloor: '⌋',
  rfr: '𝔯',
  rhard: '⇁',
  rharu: '⇀',
  rharul: '⥬',
  rho: 'ρ',
  rhov: 'ϱ',
  rightarrow: '→',
  rightarrowtail: '↣',
  rightharpoondown: '⇁',
  rightharpoonup: '⇀',
  rightleftarrows: '⇄',
  rightleftharpoons: '⇌',
  rightrightarrows: '⇉',
  rightsquigarrow: '↝',
  rightthreetimes: '⋌',
  ring: '˚',
  risingdotseq: '≓',
  rlarr: '⇄',
  rlhar: '⇌',
  rlm: '‏',
  rmoust: '⎱',
  rmoustache: '⎱',
  rnmid: '⫮',
  roang: '⟭',
  roarr: '⇾',
  robrk: '⟧',
  ropar: '⦆',
  ropf: '𝕣',
  roplus: '⨮',
  rotimes: '⨵',
  rpar: ')',
  rpargt: '⦔',
  rppolint: '⨒',
  rrarr: '⇉',
  rsaquo: '›',
  rscr: '𝓇',
  rsh: '↱',
  rsqb: ']',
  rsquo: '’',
  rsquor: '’',
  rthree: '⋌',
  rtimes: '⋊',
  rtri: '▹',
  rtrie: '⊵',
  rtrif: '▸',
  rtriltri: '⧎',
  ruluhar: '⥨',
  rx: '℞',
  sacute: 'ś',
  sbquo: '‚',
  sc: '≻',
  scE: '⪴',
  scap: '⪸',
  scaron: 'š',
  sccue: '≽',
  sce: '⪰',
  scedil: 'ş',
  scirc: 'ŝ',
  scnE: '⪶',
  scnap: '⪺',
  scnsim: '⋩',
  scpolint: '⨓',
  scsim: '≿',
  scy: 'с',
  sdot: '⋅',
  sdotb: '⊡',
  sdote: '⩦',
  seArr: '⇘',
  searhk: '⤥',
  searr: '↘',
  searrow: '↘',
  sect: '§',
  semi: ';',
  seswar: '⤩',
  setminus: '∖',
  setmn: '∖',
  sext: '✶',
  sfr: '𝔰',
  sfrown: '⌢',
  sharp: '♯',
  shchcy: 'щ',
  shcy: 'ш',
  shortmid: '∣',
  shortparallel: '∥',
  shy: '­',
  sigma: 'σ',
  sigmaf: 'ς',
  sigmav: 'ς',
  sim: '∼',
  simdot: '⩪',
  sime: '≃',
  simeq: '≃',
  simg: '⪞',
  simgE: '⪠',
  siml: '⪝',
  simlE: '⪟',
  simne: '≆',
  simplus: '⨤',
  simrarr: '⥲',
  slarr: '←',
  smallsetminus: '∖',
  smashp: '⨳',
  smeparsl: '⧤',
  smid: '∣',
  smile: '⌣',
  smt: '⪪',
  smte: '⪬',
  smtes: '⪬︀',
  softcy: 'ь',
  sol: '/',
  solb: '⧄',
  solbar: '⌿',
  sopf: '𝕤',
  spades: '♠',
  spadesuit: '♠',
  spar: '∥',
  sqcap: '⊓',
  sqcaps: '⊓︀',
  sqcup: '⊔',
  sqcups: '⊔︀',
  sqsub: '⊏',
  sqsube: '⊑',
  sqsubset: '⊏',
  sqsubseteq: '⊑',
  sqsup: '⊐',
  sqsupe: '⊒',
  sqsupset: '⊐',
  sqsupseteq: '⊒',
  squ: '□',
  square: '□',
  squarf: '▪',
  squf: '▪',
  srarr: '→',
  sscr: '𝓈',
  ssetmn: '∖',
  ssmile: '⌣',
  sstarf: '⋆',
  star: '☆',
  starf: '★',
  straightepsilon: 'ϵ',
  straightphi: 'ϕ',
  strns: '¯',
  sub: '⊂',
  subE: '⫅',
  subdot: '⪽',
  sube: '⊆',
  subedot: '⫃',
  submult: '⫁',
  subnE: '⫋',
  subne: '⊊',
  subplus: '⪿',
  subrarr: '⥹',
  subset: '⊂',
  subseteq: '⊆',
  subseteqq: '⫅',
  subsetneq: '⊊',
  subsetneqq: '⫋',
  subsim: '⫇',
  subsub: '⫕',
  subsup: '⫓',
  succ: '≻',
  succapprox: '⪸',
  succcurlyeq: '≽',
  succeq: '⪰',
  succnapprox: '⪺',
  succneqq: '⪶',
  succnsim: '⋩',
  succsim: '≿',
  sum: '∑',
  sung: '♪',
  sup1: '¹',
  sup2: '²',
  sup3: '³',
  sup: '⊃',
  supE: '⫆',
  supdot: '⪾',
  supdsub: '⫘',
  supe: '⊇',
  supedot: '⫄',
  suphsol: '⟉',
  suphsub: '⫗',
  suplarr: '⥻',
  supmult: '⫂',
  supnE: '⫌',
  supne: '⊋',
  supplus: '⫀',
  supset: '⊃',
  supseteq: '⊇',
  supseteqq: '⫆',
  supsetneq: '⊋',
  supsetneqq: '⫌',
  supsim: '⫈',
  supsub: '⫔',
  supsup: '⫖',
  swArr: '⇙',
  swarhk: '⤦',
  swarr: '↙',
  swarrow: '↙',
  swnwar: '⤪',
  szlig: 'ß',
  target: '⌖',
  tau: 'τ',
  tbrk: '⎴',
  tcaron: 'ť',
  tcedil: 'ţ',
  tcy: 'т',
  tdot: '⃛',
  telrec: '⌕',
  tfr: '𝔱',
  there4: '∴',
  therefore: '∴',
  theta: 'θ',
  thetasym: 'ϑ',
  thetav: 'ϑ',
  thickapprox: '≈',
  thicksim: '∼',
  thinsp: ' ',
  thkap: '≈',
  thksim: '∼',
  thorn: 'þ',
  tilde: '˜',
  times: '×',
  timesb: '⊠',
  timesbar: '⨱',
  timesd: '⨰',
  tint: '∭',
  toea: '⤨',
  top: '⊤',
  topbot: '⌶',
  topcir: '⫱',
  topf: '𝕥',
  topfork: '⫚',
  tosa: '⤩',
  tprime: '‴',
  trade: '™',
  triangle: '▵',
  triangledown: '▿',
  triangleleft: '◃',
  trianglelefteq: '⊴',
  triangleq: '≜',
  triangleright: '▹',
  trianglerighteq: '⊵',
  tridot: '◬',
  trie: '≜',
  triminus: '⨺',
  triplus: '⨹',
  trisb: '⧍',
  tritime: '⨻',
  trpezium: '⏢',
  tscr: '𝓉',
  tscy: 'ц',
  tshcy: 'ћ',
  tstrok: 'ŧ',
  twixt: '≬',
  twoheadleftarrow: '↞',
  twoheadrightarrow: '↠',
  uArr: '⇑',
  uHar: '⥣',
  uacute: 'ú',
  uarr: '↑',
  ubrcy: 'ў',
  ubreve: 'ŭ',
  ucirc: 'û',
  ucy: 'у',
  udarr: '⇅',
  udblac: 'ű',
  udhar: '⥮',
  ufisht: '⥾',
  ufr: '𝔲',
  ugrave: 'ù',
  uharl: '↿',
  uharr: '↾',
  uhblk: '▀',
  ulcorn: '⌜',
  ulcorner: '⌜',
  ulcrop: '⌏',
  ultri: '◸',
  umacr: 'ū',
  uml: '¨',
  uogon: 'ų',
  uopf: '𝕦',
  uparrow: '↑',
  updownarrow: '↕',
  upharpoonleft: '↿',
  upharpoonright: '↾',
  uplus: '⊎',
  upsi: 'υ',
  upsih: 'ϒ',
  upsilon: 'υ',
  upuparrows: '⇈',
  urcorn: '⌝',
  urcorner: '⌝',
  urcrop: '⌎',
  uring: 'ů',
  urtri: '◹',
  uscr: '𝓊',
  utdot: '⋰',
  utilde: 'ũ',
  utri: '▵',
  utrif: '▴',
  uuarr: '⇈',
  uuml: 'ü',
  uwangle: '⦧',
  vArr: '⇕',
  vBar: '⫨',
  vBarv: '⫩',
  vDash: '⊨',
  vangrt: '⦜',
  varepsilon: 'ϵ',
  varkappa: 'ϰ',
  varnothing: '∅',
  varphi: 'ϕ',
  varpi: 'ϖ',
  varpropto: '∝',
  varr: '↕',
  varrho: 'ϱ',
  varsigma: 'ς',
  varsubsetneq: '⊊︀',
  varsubsetneqq: '⫋︀',
  varsupsetneq: '⊋︀',
  varsupsetneqq: '⫌︀',
  vartheta: 'ϑ',
  vartriangleleft: '⊲',
  vartriangleright: '⊳',
  vcy: 'в',
  vdash: '⊢',
  vee: '∨',
  veebar: '⊻',
  veeeq: '≚',
  vellip: '⋮',
  verbar: '|',
  vert: '|',
  vfr: '𝔳',
  vltri: '⊲',
  vnsub: '⊂⃒',
  vnsup: '⊃⃒',
  vopf: '𝕧',
  vprop: '∝',
  vrtri: '⊳',
  vscr: '𝓋',
  vsubnE: '⫋︀',
  vsubne: '⊊︀',
  vsupnE: '⫌︀',
  vsupne: '⊋︀',
  vzigzag: '⦚',
  wcirc: 'ŵ',
  wedbar: '⩟',
  wedge: '∧',
  wedgeq: '≙',
  weierp: '℘',
  wfr: '𝔴',
  wopf: '𝕨',
  wp: '℘',
  wr: '≀',
  wreath: '≀',
  wscr: '𝓌',
  xcap: '⋂',
  xcirc: '◯',
  xcup: '⋃',
  xdtri: '▽',
  xfr: '𝔵',
  xhArr: '⟺',
  xharr: '⟷',
  xi: 'ξ',
  xlArr: '⟸',
  xlarr: '⟵',
  xmap: '⟼',
  xnis: '⋻',
  xodot: '⨀',
  xopf: '𝕩',
  xoplus: '⨁',
  xotime: '⨂',
  xrArr: '⟹',
  xrarr: '⟶',
  xscr: '𝓍',
  xsqcup: '⨆',
  xuplus: '⨄',
  xutri: '△',
  xvee: '⋁',
  xwedge: '⋀',
  yacute: 'ý',
  yacy: 'я',
  ycirc: 'ŷ',
  ycy: 'ы',
  yen: '¥',
  yfr: '𝔶',
  yicy: 'ї',
  yopf: '𝕪',
  yscr: '𝓎',
  yucy: 'ю',
  yuml: 'ÿ',
  zacute: 'ź',
  zcaron: 'ž',
  zcy: 'з',
  zdot: 'ż',
  zeetrf: 'ℨ',
  zeta: 'ζ',
  zfr: '𝔷',
  zhcy: 'ж',
  zigrarr: '⇝',
  zopf: '𝕫',
  zscr: '𝓏',
  zwj: '‍',
  zwnj: '‌'
};

// To do: next major: use `Object.hasOwn`.
const own = {}.hasOwnProperty;

/**
 * Decode a single character reference (without the `&` or `;`).
 * You probably only need this when you’re building parsers yourself that follow
 * different rules compared to HTML.
 * This is optimized to be tiny in browsers.
 *
 * @param {string} value
 *   `notin` (named), `#123` (deci), `#x123` (hexa).
 * @returns {string|false}
 *   Decoded reference.
 */
function decodeNamedCharacterReference(value) {
  return own.call(characterEntities, value) ? characterEntities[value] : false
}

/**
 * Like `Array#splice`, but smarter for giant arrays.
 *
 * `Array#splice` takes all items to be inserted as individual argument which
 * causes a stack overflow in V8 when trying to insert 100k items for instance.
 *
 * Otherwise, this does not return the removed items, and takes `items` as an
 * array instead of rest parameters.
 *
 * @template {unknown} T
 *   Item type.
 * @param {Array<T>} list
 *   List to operate on.
 * @param {number} start
 *   Index to remove/insert at (can be negative).
 * @param {number} remove
 *   Number of items to remove.
 * @param {Array<T>} items
 *   Items to inject into `list`.
 * @returns {undefined}
 *   Nothing.
 */
function splice(list, start, remove, items) {
  const end = list.length;
  let chunkStart = 0;
  /** @type {Array<unknown>} */
  let parameters;

  // Make start between zero and `end` (included).
  if (start < 0) {
    start = -start > end ? 0 : end + start;
  } else {
    start = start > end ? end : start;
  }
  remove = remove > 0 ? remove : 0;

  // No need to chunk the items if there’s only a couple (10k) items.
  if (items.length < 10000) {
    parameters = Array.from(items);
    parameters.unshift(start, remove);
    // @ts-expect-error Hush, it’s fine.
    list.splice(...parameters);
  } else {
    // Delete `remove` items starting from `start`
    if (remove) list.splice(start, remove);

    // Insert the items in chunks to not cause stack overflows.
    while (chunkStart < items.length) {
      parameters = items.slice(chunkStart, chunkStart + 10000);
      parameters.unshift(start, 0);
      // @ts-expect-error Hush, it’s fine.
      list.splice(...parameters);
      chunkStart += 10000;
      start += 10000;
    }
  }
}

/**
 * Append `items` (an array) at the end of `list` (another array).
 * When `list` was empty, returns `items` instead.
 *
 * This prevents a potentially expensive operation when `list` is empty,
 * and adds items in batches to prevent V8 from hanging.
 *
 * @template {unknown} T
 *   Item type.
 * @param {Array<T>} list
 *   List to operate on.
 * @param {Array<T>} items
 *   Items to add to `list`.
 * @returns {Array<T>}
 *   Either `list` or `items`.
 */
function push(list, items) {
  if (list.length > 0) {
    splice(list, list.length, 0, items);
    return list;
  }
  return items;
}

/**
 * @import {
 *   Extension,
 *   Handles,
 *   HtmlExtension,
 *   NormalizedExtension
 * } from 'micromark-util-types'
 */


const hasOwnProperty = {}.hasOwnProperty;

/**
 * Combine multiple syntax extensions into one.
 *
 * @param {ReadonlyArray<Extension>} extensions
 *   List of syntax extensions.
 * @returns {NormalizedExtension}
 *   A single combined extension.
 */
function combineExtensions(extensions) {
  /** @type {NormalizedExtension} */
  const all = {};
  let index = -1;

  while (++index < extensions.length) {
    syntaxExtension(all, extensions[index]);
  }

  return all
}

/**
 * Merge `extension` into `all`.
 *
 * @param {NormalizedExtension} all
 *   Extension to merge into.
 * @param {Extension} extension
 *   Extension to merge.
 * @returns {undefined}
 *   Nothing.
 */
function syntaxExtension(all, extension) {
  /** @type {keyof Extension} */
  let hook;

  for (hook in extension) {
    const maybe = hasOwnProperty.call(all, hook) ? all[hook] : undefined;
    /** @type {Record<string, unknown>} */
    const left = maybe || (all[hook] = {});
    /** @type {Record<string, unknown> | undefined} */
    const right = extension[hook];
    /** @type {string} */
    let code;

    if (right) {
      for (code in right) {
        if (!hasOwnProperty.call(left, code)) left[code] = [];
        const value = right[code];
        constructs(
          // @ts-expect-error Looks like a list.
          left[code],
          Array.isArray(value) ? value : value ? [value] : []
        );
      }
    }
  }
}

/**
 * Merge `list` into `existing` (both lists of constructs).
 * Mutates `existing`.
 *
 * @param {Array<unknown>} existing
 *   List of constructs to merge into.
 * @param {Array<unknown>} list
 *   List of constructs to merge.
 * @returns {undefined}
 *   Nothing.
 */
function constructs(existing, list) {
  let index = -1;
  /** @type {Array<unknown>} */
  const before = [];

  while (++index < list.length) {
(list[index].add === 'after' ? existing : before).push(list[index]);
  }

  splice(existing, 0, 0, before);
}

/**
 * Combine multiple HTML extensions into one.
 *
 * @param {ReadonlyArray<HtmlExtension>} htmlExtensions
 *   List of HTML extensions.
 * @returns {HtmlExtension}
 *   Single combined HTML extension.
 */
function combineHtmlExtensions(htmlExtensions) {
  /** @type {HtmlExtension} */
  const handlers = {};
  let index = -1;

  while (++index < htmlExtensions.length) {
    htmlExtension(handlers, htmlExtensions[index]);
  }

  return handlers
}

/**
 * Merge `extension` into `all`.
 *
 * @param {HtmlExtension} all
 *   Extension to merge into.
 * @param {HtmlExtension} extension
 *   Extension to merge.
 * @returns {undefined}
 *   Nothing.
 */
function htmlExtension(all, extension) {
  /** @type {keyof HtmlExtension} */
  let hook;

  for (hook in extension) {
    const maybe = hasOwnProperty.call(all, hook) ? all[hook] : undefined;
    const left = maybe || (all[hook] = {});
    const right = extension[hook];
    /** @type {keyof Handles} */
    let type;

    if (right) {
      for (type in right) {
        // @ts-expect-error assume document vs regular handler are managed correctly.
        left[type] = right[type];
      }
    }
  }
}

/**
 * Turn the number (in string form as either hexa- or plain decimal) coming from
 * a numeric character reference into a character.
 *
 * Sort of like `String.fromCodePoint(Number.parseInt(value, base))`, but makes
 * non-characters and control characters safe.
 *
 * @param {string} value
 *   Value to decode.
 * @param {number} base
 *   Numeric base.
 * @returns {string}
 *   Character.
 */
function decodeNumericCharacterReference(value, base) {
  const code = Number.parseInt(value, base);
  if (
  // C0 except for HT, LF, FF, CR, space.
  code < 9 || code === 11 || code > 13 && code < 32 ||
  // Control character (DEL) of C0, and C1 controls.
  code > 126 && code < 160 ||
  // Lone high surrogates and low surrogates.
  code > 55_295 && code < 57_344 ||
  // Noncharacters.
  code > 64_975 && code < 65_008 || /* eslint-disable no-bitwise */
  (code & 65_535) === 65_535 || (code & 65_535) === 65_534 || /* eslint-enable no-bitwise */
  // Out of range
  code > 1_114_111) {
    return "\uFFFD";
  }
  return String.fromCodePoint(code);
}

/**
 * Normalize an identifier (as found in references, definitions).
 *
 * Collapses markdown whitespace, trim, and then lower- and uppercase.
 *
 * Some characters are considered “uppercase”, such as U+03F4 (`ϴ`), but if their
 * lowercase counterpart (U+03B8 (`θ`)) is uppercased will result in a different
 * uppercase character (U+0398 (`Θ`)).
 * So, to get a canonical form, we perform both lower- and uppercase.
 *
 * Using uppercase last makes sure keys will never interact with default
 * prototypal values (such as `constructor`): nothing in the prototype of
 * `Object` is uppercase.
 *
 * @param {string} value
 *   Identifier to normalize.
 * @returns {string}
 *   Normalized identifier.
 */
function normalizeIdentifier(value) {
  return value
  // Collapse markdown whitespace.
  .replace(/[\t\n\r ]+/g, " ")
  // Trim.
  .replace(/^ | $/g, '')
  // Some characters are considered “uppercase”, but if their lowercase
  // counterpart is uppercased will result in a different uppercase
  // character.
  // Hence, to get that form, we perform both lower- and uppercase.
  // Upper case makes sure keys will not interact with default prototypal
  // methods: no method is uppercase.
  .toLowerCase().toUpperCase();
}

/**
 * @import {Code} from 'micromark-util-types'
 */

/**
 * Check whether the character code represents an ASCII alpha (`a` through `z`,
 * case insensitive).
 *
 * An **ASCII alpha** is an ASCII upper alpha or ASCII lower alpha.
 *
 * An **ASCII upper alpha** is a character in the inclusive range U+0041 (`A`)
 * to U+005A (`Z`).
 *
 * An **ASCII lower alpha** is a character in the inclusive range U+0061 (`a`)
 * to U+007A (`z`).
 *
 * @param code
 *   Code.
 * @returns {boolean}
 *   Whether it matches.
 */
const asciiAlpha = regexCheck(/[A-Za-z]/);

/**
 * Check whether the character code represents an ASCII alphanumeric (`a`
 * through `z`, case insensitive, or `0` through `9`).
 *
 * An **ASCII alphanumeric** is an ASCII digit (see `asciiDigit`) or ASCII alpha
 * (see `asciiAlpha`).
 *
 * @param code
 *   Code.
 * @returns {boolean}
 *   Whether it matches.
 */
const asciiAlphanumeric = regexCheck(/[\dA-Za-z]/);

/**
 * Check whether the character code represents an ASCII atext.
 *
 * atext is an ASCII alphanumeric (see `asciiAlphanumeric`), or a character in
 * the inclusive ranges U+0023 NUMBER SIGN (`#`) to U+0027 APOSTROPHE (`'`),
 * U+002A ASTERISK (`*`), U+002B PLUS SIGN (`+`), U+002D DASH (`-`), U+002F
 * SLASH (`/`), U+003D EQUALS TO (`=`), U+003F QUESTION MARK (`?`), U+005E
 * CARET (`^`) to U+0060 GRAVE ACCENT (`` ` ``), or U+007B LEFT CURLY BRACE
 * (`{`) to U+007E TILDE (`~`).
 *
 * See:
 * **\[RFC5322]**:
 * [Internet Message Format](https://tools.ietf.org/html/rfc5322).
 * P. Resnick.
 * IETF.
 *
 * @param code
 *   Code.
 * @returns {boolean}
 *   Whether it matches.
 */
const asciiAtext = regexCheck(/[#-'*+\--9=?A-Z^-~]/);

/**
 * Check whether a character code is an ASCII control character.
 *
 * An **ASCII control** is a character in the inclusive range U+0000 NULL (NUL)
 * to U+001F (US), or U+007F (DEL).
 *
 * @param {Code} code
 *   Code.
 * @returns {boolean}
 *   Whether it matches.
 */
function asciiControl(code) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    code !== null && (code < 32 || code === 127)
  );
}

/**
 * Check whether the character code represents an ASCII digit (`0` through `9`).
 *
 * An **ASCII digit** is a character in the inclusive range U+0030 (`0`) to
 * U+0039 (`9`).
 *
 * @param code
 *   Code.
 * @returns {boolean}
 *   Whether it matches.
 */
const asciiDigit = regexCheck(/\d/);

/**
 * Check whether the character code represents an ASCII hex digit (`a` through
 * `f`, case insensitive, or `0` through `9`).
 *
 * An **ASCII hex digit** is an ASCII digit (see `asciiDigit`), ASCII upper hex
 * digit, or an ASCII lower hex digit.
 *
 * An **ASCII upper hex digit** is a character in the inclusive range U+0041
 * (`A`) to U+0046 (`F`).
 *
 * An **ASCII lower hex digit** is a character in the inclusive range U+0061
 * (`a`) to U+0066 (`f`).
 *
 * @param code
 *   Code.
 * @returns {boolean}
 *   Whether it matches.
 */
const asciiHexDigit = regexCheck(/[\dA-Fa-f]/);

/**
 * Check whether the character code represents ASCII punctuation.
 *
 * An **ASCII punctuation** is a character in the inclusive ranges U+0021
 * EXCLAMATION MARK (`!`) to U+002F SLASH (`/`), U+003A COLON (`:`) to U+0040 AT
 * SIGN (`@`), U+005B LEFT SQUARE BRACKET (`[`) to U+0060 GRAVE ACCENT
 * (`` ` ``), or U+007B LEFT CURLY BRACE (`{`) to U+007E TILDE (`~`).
 *
 * @param code
 *   Code.
 * @returns {boolean}
 *   Whether it matches.
 */
const asciiPunctuation = regexCheck(/[!-/:-@[-`{-~]/);

/**
 * Check whether a character code is a markdown line ending.
 *
 * A **markdown line ending** is the virtual characters M-0003 CARRIAGE RETURN
 * LINE FEED (CRLF), M-0004 LINE FEED (LF) and M-0005 CARRIAGE RETURN (CR).
 *
 * In micromark, the actual character U+000A LINE FEED (LF) and U+000D CARRIAGE
 * RETURN (CR) are replaced by these virtual characters depending on whether
 * they occurred together.
 *
 * @param {Code} code
 *   Code.
 * @returns {boolean}
 *   Whether it matches.
 */
function markdownLineEnding(code) {
  return code !== null && code < -2;
}

/**
 * Check whether a character code is a markdown line ending (see
 * `markdownLineEnding`) or markdown space (see `markdownSpace`).
 *
 * @param {Code} code
 *   Code.
 * @returns {boolean}
 *   Whether it matches.
 */
function markdownLineEndingOrSpace(code) {
  return code !== null && (code < 0 || code === 32);
}

/**
 * Check whether a character code is a markdown space.
 *
 * A **markdown space** is the concrete character U+0020 SPACE (SP) and the
 * virtual characters M-0001 VIRTUAL SPACE (VS) and M-0002 HORIZONTAL TAB (HT).
 *
 * In micromark, the actual character U+0009 CHARACTER TABULATION (HT) is
 * replaced by one M-0002 HORIZONTAL TAB (HT) and between 0 and 3 M-0001 VIRTUAL
 * SPACE (VS) characters, depending on the column at which the tab occurred.
 *
 * @param {Code} code
 *   Code.
 * @returns {boolean}
 *   Whether it matches.
 */
function markdownSpace(code) {
  return code === -2 || code === -1 || code === 32;
}

// Size note: removing ASCII from the regex and using `asciiPunctuation` here
// In fact adds to the bundle size.
/**
 * Check whether the character code represents Unicode punctuation.
 *
 * A **Unicode punctuation** is a character in the Unicode `Pc` (Punctuation,
 * Connector), `Pd` (Punctuation, Dash), `Pe` (Punctuation, Close), `Pf`
 * (Punctuation, Final quote), `Pi` (Punctuation, Initial quote), `Po`
 * (Punctuation, Other), or `Ps` (Punctuation, Open) categories, or an ASCII
 * punctuation (see `asciiPunctuation`).
 *
 * See:
 * **\[UNICODE]**:
 * [The Unicode Standard](https://www.unicode.org/versions/).
 * Unicode Consortium.
 *
 * @param code
 *   Code.
 * @returns
 *   Whether it matches.
 */
const unicodePunctuation = regexCheck(/\p{P}|\p{S}/u);

/**
 * Check whether the character code represents Unicode whitespace.
 *
 * Note that this does handle micromark specific markdown whitespace characters.
 * See `markdownLineEndingOrSpace` to check that.
 *
 * A **Unicode whitespace** is a character in the Unicode `Zs` (Separator,
 * Space) category, or U+0009 CHARACTER TABULATION (HT), U+000A LINE FEED (LF),
 * U+000C (FF), or U+000D CARRIAGE RETURN (CR) (**\[UNICODE]**).
 *
 * See:
 * **\[UNICODE]**:
 * [The Unicode Standard](https://www.unicode.org/versions/).
 * Unicode Consortium.
 *
 * @param code
 *   Code.
 * @returns
 *   Whether it matches.
 */
const unicodeWhitespace = regexCheck(/\s/);

/**
 * Create a code check from a regex.
 *
 * @param {RegExp} regex
 *   Expression.
 * @returns {(code: Code) => boolean}
 *   Check.
 */
function regexCheck(regex) {
  return check;

  /**
   * Check whether a code matches the bound regex.
   *
   * @param {Code} code
   *   Character code.
   * @returns {boolean}
   *   Whether the character code matches the bound regex.
   */
  function check(code) {
    return code !== null && code > -1 && regex.test(String.fromCharCode(code));
  }
}

/**
 * @import {Effects, State, TokenType} from 'micromark-util-types'
 */


// To do: implement `spaceOrTab`, `spaceOrTabMinMax`, `spaceOrTabWithOptions`.

/**
 * Parse spaces and tabs.
 *
 * There is no `nok` parameter:
 *
 * *   spaces in markdown are often optional, in which case this factory can be
 *     used and `ok` will be switched to whether spaces were found or not
 * *   one line ending or space can be detected with `markdownSpace(code)` right
 *     before using `factorySpace`
 *
 * ###### Examples
 *
 * Where `␉` represents a tab (plus how much it expands) and `␠` represents a
 * single space.
 *
 * ```markdown
 * ␉
 * ␠␠␠␠
 * ␉␠
 * ```
 *
 * @param {Effects} effects
 *   Context.
 * @param {State} ok
 *   State switched to when successful.
 * @param {TokenType} type
 *   Type (`' \t'`).
 * @param {number | undefined} [max=Infinity]
 *   Max (exclusive).
 * @returns {State}
 *   Start state.
 */
function factorySpace(effects, ok, type, max) {
  const limit = max ? max - 1 : Number.POSITIVE_INFINITY;
  let size = 0;
  return start;

  /** @type {State} */
  function start(code) {
    if (markdownSpace(code)) {
      effects.enter(type);
      return prefix(code);
    }
    return ok(code);
  }

  /** @type {State} */
  function prefix(code) {
    if (markdownSpace(code) && size++ < limit) {
      effects.consume(code);
      return prefix;
    }
    effects.exit(type);
    return ok(code);
  }
}

/**
 * @import {
 *   InitialConstruct,
 *   Initializer,
 *   State,
 *   TokenizeContext,
 *   Token
 * } from 'micromark-util-types'
 */

/** @type {InitialConstruct} */
const content$1 = {
  tokenize: initializeContent
};

/**
 * @this {TokenizeContext}
 *   Context.
 * @type {Initializer}
 *   Content.
 */
function initializeContent(effects) {
  const contentStart = effects.attempt(this.parser.constructs.contentInitial, afterContentStartConstruct, paragraphInitial);
  /** @type {Token} */
  let previous;
  return contentStart;

  /** @type {State} */
  function afterContentStartConstruct(code) {
    if (code === null) {
      effects.consume(code);
      return;
    }
    effects.enter("lineEnding");
    effects.consume(code);
    effects.exit("lineEnding");
    return factorySpace(effects, contentStart, "linePrefix");
  }

  /** @type {State} */
  function paragraphInitial(code) {
    effects.enter("paragraph");
    return lineStart(code);
  }

  /** @type {State} */
  function lineStart(code) {
    const token = effects.enter("chunkText", {
      contentType: "text",
      previous
    });
    if (previous) {
      previous.next = token;
    }
    previous = token;
    return data(code);
  }

  /** @type {State} */
  function data(code) {
    if (code === null) {
      effects.exit("chunkText");
      effects.exit("paragraph");
      effects.consume(code);
      return;
    }
    if (markdownLineEnding(code)) {
      effects.consume(code);
      effects.exit("chunkText");
      return lineStart;
    }

    // Data.
    effects.consume(code);
    return data;
  }
}

/**
 * @import {
 *   Construct,
 *   ContainerState,
 *   InitialConstruct,
 *   Initializer,
 *   Point,
 *   State,
 *   TokenizeContext,
 *   Tokenizer,
 *   Token
 * } from 'micromark-util-types'
 */

/** @type {InitialConstruct} */
const document$1 = {
  tokenize: initializeDocument
};

/** @type {Construct} */
const containerConstruct = {
  tokenize: tokenizeContainer
};

/**
 * @this {TokenizeContext}
 *   Self.
 * @type {Initializer}
 *   Initializer.
 */
function initializeDocument(effects) {
  const self = this;
  /** @type {Array<StackItem>} */
  const stack = [];
  let continued = 0;
  /** @type {TokenizeContext | undefined} */
  let childFlow;
  /** @type {Token | undefined} */
  let childToken;
  /** @type {number} */
  let lineStartOffset;
  return start;

  /** @type {State} */
  function start(code) {
    // First we iterate through the open blocks, starting with the root
    // document, and descending through last children down to the last open
    // block.
    // Each block imposes a condition that the line must satisfy if the block is
    // to remain open.
    // For example, a block quote requires a `>` character.
    // A paragraph requires a non-blank line.
    // In this phase we may match all or just some of the open blocks.
    // But we cannot close unmatched blocks yet, because we may have a lazy
    // continuation line.
    if (continued < stack.length) {
      const item = stack[continued];
      self.containerState = item[1];
      return effects.attempt(item[0].continuation, documentContinue, checkNewContainers)(code);
    }

    // Done.
    return checkNewContainers(code);
  }

  /** @type {State} */
  function documentContinue(code) {
    continued++;

    // Note: this field is called `_closeFlow` but it also closes containers.
    // Perhaps a good idea to rename it but it’s already used in the wild by
    // extensions.
    if (self.containerState._closeFlow) {
      self.containerState._closeFlow = undefined;
      if (childFlow) {
        closeFlow();
      }

      // Note: this algorithm for moving events around is similar to the
      // algorithm when dealing with lazy lines in `writeToChild`.
      const indexBeforeExits = self.events.length;
      let indexBeforeFlow = indexBeforeExits;
      /** @type {Point | undefined} */
      let point;

      // Find the flow chunk.
      while (indexBeforeFlow--) {
        if (self.events[indexBeforeFlow][0] === 'exit' && self.events[indexBeforeFlow][1].type === "chunkFlow") {
          point = self.events[indexBeforeFlow][1].end;
          break;
        }
      }
      exitContainers(continued);

      // Fix positions.
      let index = indexBeforeExits;
      while (index < self.events.length) {
        self.events[index][1].end = {
          ...point
        };
        index++;
      }

      // Inject the exits earlier (they’re still also at the end).
      splice(self.events, indexBeforeFlow + 1, 0, self.events.slice(indexBeforeExits));

      // Discard the duplicate exits.
      self.events.length = index;
      return checkNewContainers(code);
    }
    return start(code);
  }

  /** @type {State} */
  function checkNewContainers(code) {
    // Next, after consuming the continuation markers for existing blocks, we
    // look for new block starts (e.g. `>` for a block quote).
    // If we encounter a new block start, we close any blocks unmatched in
    // step 1 before creating the new block as a child of the last matched
    // block.
    if (continued === stack.length) {
      // No need to `check` whether there’s a container, of `exitContainers`
      // would be moot.
      // We can instead immediately `attempt` to parse one.
      if (!childFlow) {
        return documentContinued(code);
      }

      // If we have concrete content, such as block HTML or fenced code,
      // we can’t have containers “pierce” into them, so we can immediately
      // start.
      if (childFlow.currentConstruct && childFlow.currentConstruct.concrete) {
        return flowStart(code);
      }

      // If we do have flow, it could still be a blank line,
      // but we’d be interrupting it w/ a new container if there’s a current
      // construct.
      // To do: next major: remove `_gfmTableDynamicInterruptHack` (no longer
      // needed in micromark-extension-gfm-table@1.0.6).
      self.interrupt = Boolean(childFlow.currentConstruct && !childFlow._gfmTableDynamicInterruptHack);
    }

    // Check if there is a new container.
    self.containerState = {};
    return effects.check(containerConstruct, thereIsANewContainer, thereIsNoNewContainer)(code);
  }

  /** @type {State} */
  function thereIsANewContainer(code) {
    if (childFlow) closeFlow();
    exitContainers(continued);
    return documentContinued(code);
  }

  /** @type {State} */
  function thereIsNoNewContainer(code) {
    self.parser.lazy[self.now().line] = continued !== stack.length;
    lineStartOffset = self.now().offset;
    return flowStart(code);
  }

  /** @type {State} */
  function documentContinued(code) {
    // Try new containers.
    self.containerState = {};
    return effects.attempt(containerConstruct, containerContinue, flowStart)(code);
  }

  /** @type {State} */
  function containerContinue(code) {
    continued++;
    stack.push([self.currentConstruct, self.containerState]);
    // Try another.
    return documentContinued(code);
  }

  /** @type {State} */
  function flowStart(code) {
    if (code === null) {
      if (childFlow) closeFlow();
      exitContainers(0);
      effects.consume(code);
      return;
    }
    childFlow = childFlow || self.parser.flow(self.now());
    effects.enter("chunkFlow", {
      _tokenizer: childFlow,
      contentType: "flow",
      previous: childToken
    });
    return flowContinue(code);
  }

  /** @type {State} */
  function flowContinue(code) {
    if (code === null) {
      writeToChild(effects.exit("chunkFlow"), true);
      exitContainers(0);
      effects.consume(code);
      return;
    }
    if (markdownLineEnding(code)) {
      effects.consume(code);
      writeToChild(effects.exit("chunkFlow"));
      // Get ready for the next line.
      continued = 0;
      self.interrupt = undefined;
      return start;
    }
    effects.consume(code);
    return flowContinue;
  }

  /**
   * @param {Token} token
   *   Token.
   * @param {boolean | undefined} [endOfFile]
   *   Whether the token is at the end of the file (default: `false`).
   * @returns {undefined}
   *   Nothing.
   */
  function writeToChild(token, endOfFile) {
    const stream = self.sliceStream(token);
    if (endOfFile) stream.push(null);
    token.previous = childToken;
    if (childToken) childToken.next = token;
    childToken = token;
    childFlow.defineSkip(token.start);
    childFlow.write(stream);

    // Alright, so we just added a lazy line:
    //
    // ```markdown
    // > a
    // b.
    //
    // Or:
    //
    // > ~~~c
    // d
    //
    // Or:
    //
    // > | e |
    // f
    // ```
    //
    // The construct in the second example (fenced code) does not accept lazy
    // lines, so it marked itself as done at the end of its first line, and
    // then the content construct parses `d`.
    // Most constructs in markdown match on the first line: if the first line
    // forms a construct, a non-lazy line can’t “unmake” it.
    //
    // The construct in the third example is potentially a GFM table, and
    // those are *weird*.
    // It *could* be a table, from the first line, if the following line
    // matches a condition.
    // In this case, that second line is lazy, which “unmakes” the first line
    // and turns the whole into one content block.
    //
    // We’ve now parsed the non-lazy and the lazy line, and can figure out
    // whether the lazy line started a new flow block.
    // If it did, we exit the current containers between the two flow blocks.
    if (self.parser.lazy[token.start.line]) {
      let index = childFlow.events.length;
      while (index--) {
        if (
        // The token starts before the line ending…
        childFlow.events[index][1].start.offset < lineStartOffset && (
        // …and either is not ended yet…
        !childFlow.events[index][1].end ||
        // …or ends after it.
        childFlow.events[index][1].end.offset > lineStartOffset)) {
          // Exit: there’s still something open, which means it’s a lazy line
          // part of something.
          return;
        }
      }

      // Note: this algorithm for moving events around is similar to the
      // algorithm when closing flow in `documentContinue`.
      const indexBeforeExits = self.events.length;
      let indexBeforeFlow = indexBeforeExits;
      /** @type {boolean | undefined} */
      let seen;
      /** @type {Point | undefined} */
      let point;

      // Find the previous chunk (the one before the lazy line).
      while (indexBeforeFlow--) {
        if (self.events[indexBeforeFlow][0] === 'exit' && self.events[indexBeforeFlow][1].type === "chunkFlow") {
          if (seen) {
            point = self.events[indexBeforeFlow][1].end;
            break;
          }
          seen = true;
        }
      }
      exitContainers(continued);

      // Fix positions.
      index = indexBeforeExits;
      while (index < self.events.length) {
        self.events[index][1].end = {
          ...point
        };
        index++;
      }

      // Inject the exits earlier (they’re still also at the end).
      splice(self.events, indexBeforeFlow + 1, 0, self.events.slice(indexBeforeExits));

      // Discard the duplicate exits.
      self.events.length = index;
    }
  }

  /**
   * @param {number} size
   *   Size.
   * @returns {undefined}
   *   Nothing.
   */
  function exitContainers(size) {
    let index = stack.length;

    // Exit open containers.
    while (index-- > size) {
      const entry = stack[index];
      self.containerState = entry[1];
      entry[0].exit.call(self, effects);
    }
    stack.length = size;
  }
  function closeFlow() {
    childFlow.write([null]);
    childToken = undefined;
    childFlow = undefined;
    self.containerState._closeFlow = undefined;
  }
}

/**
 * @this {TokenizeContext}
 *   Context.
 * @type {Tokenizer}
 *   Tokenizer.
 */
function tokenizeContainer(effects, ok, nok) {
  // Always populated by defaults.

  return factorySpace(effects, effects.attempt(this.parser.constructs.document, ok, nok), "linePrefix", this.parser.constructs.disable.null.includes('codeIndented') ? undefined : 4);
}

/**
 * @import {Code} from 'micromark-util-types'
 */

/**
 * Classify whether a code represents whitespace, punctuation, or something
 * else.
 *
 * Used for attention (emphasis, strong), whose sequences can open or close
 * based on the class of surrounding characters.
 *
 * > 👉 **Note**: eof (`null`) is seen as whitespace.
 *
 * @param {Code} code
 *   Code.
 * @returns {typeof constants.characterGroupWhitespace | typeof constants.characterGroupPunctuation | undefined}
 *   Group.
 */
function classifyCharacter(code) {
  if (code === null || markdownLineEndingOrSpace(code) || unicodeWhitespace(code)) {
    return 1;
  }
  if (unicodePunctuation(code)) {
    return 2;
  }
}

/**
 * @import {Event, Resolver, TokenizeContext} from 'micromark-util-types'
 */

/**
 * Call all `resolveAll`s.
 *
 * @param {ReadonlyArray<{resolveAll?: Resolver | undefined}>} constructs
 *   List of constructs, optionally with `resolveAll`s.
 * @param {Array<Event>} events
 *   List of events.
 * @param {TokenizeContext} context
 *   Context used by `tokenize`.
 * @returns {Array<Event>}
 *   Changed events.
 */
function resolveAll(constructs, events, context) {
  /** @type {Array<Resolver>} */
  const called = [];
  let index = -1;

  while (++index < constructs.length) {
    const resolve = constructs[index].resolveAll;

    if (resolve && !called.includes(resolve)) {
      events = resolve(events, context);
      called.push(resolve);
    }
  }

  return events
}

/**
 * @import {
 *   Code,
 *   Construct,
 *   Event,
 *   Point,
 *   Resolver,
 *   State,
 *   TokenizeContext,
 *   Tokenizer,
 *   Token
 * } from 'micromark-util-types'
 */

/** @type {Construct} */
const attention = {
  name: 'attention',
  resolveAll: resolveAllAttention,
  tokenize: tokenizeAttention
};

/**
 * Take all events and resolve attention to emphasis or strong.
 *
 * @type {Resolver}
 */
// eslint-disable-next-line complexity
function resolveAllAttention(events, context) {
  let index = -1;
  /** @type {number} */
  let open;
  /** @type {Token} */
  let group;
  /** @type {Token} */
  let text;
  /** @type {Token} */
  let openingSequence;
  /** @type {Token} */
  let closingSequence;
  /** @type {number} */
  let use;
  /** @type {Array<Event>} */
  let nextEvents;
  /** @type {number} */
  let offset;

  // Walk through all events.
  //
  // Note: performance of this is fine on an mb of normal markdown, but it’s
  // a bottleneck for malicious stuff.
  while (++index < events.length) {
    // Find a token that can close.
    if (events[index][0] === 'enter' && events[index][1].type === 'attentionSequence' && events[index][1]._close) {
      open = index;

      // Now walk back to find an opener.
      while (open--) {
        // Find a token that can open the closer.
        if (events[open][0] === 'exit' && events[open][1].type === 'attentionSequence' && events[open][1]._open &&
        // If the markers are the same:
        context.sliceSerialize(events[open][1]).charCodeAt(0) === context.sliceSerialize(events[index][1]).charCodeAt(0)) {
          // If the opening can close or the closing can open,
          // and the close size *is not* a multiple of three,
          // but the sum of the opening and closing size *is* multiple of three,
          // then don’t match.
          if ((events[open][1]._close || events[index][1]._open) && (events[index][1].end.offset - events[index][1].start.offset) % 3 && !((events[open][1].end.offset - events[open][1].start.offset + events[index][1].end.offset - events[index][1].start.offset) % 3)) {
            continue;
          }

          // Number of markers to use from the sequence.
          use = events[open][1].end.offset - events[open][1].start.offset > 1 && events[index][1].end.offset - events[index][1].start.offset > 1 ? 2 : 1;
          const start = {
            ...events[open][1].end
          };
          const end = {
            ...events[index][1].start
          };
          movePoint(start, -use);
          movePoint(end, use);
          openingSequence = {
            type: use > 1 ? "strongSequence" : "emphasisSequence",
            start,
            end: {
              ...events[open][1].end
            }
          };
          closingSequence = {
            type: use > 1 ? "strongSequence" : "emphasisSequence",
            start: {
              ...events[index][1].start
            },
            end
          };
          text = {
            type: use > 1 ? "strongText" : "emphasisText",
            start: {
              ...events[open][1].end
            },
            end: {
              ...events[index][1].start
            }
          };
          group = {
            type: use > 1 ? "strong" : "emphasis",
            start: {
              ...openingSequence.start
            },
            end: {
              ...closingSequence.end
            }
          };
          events[open][1].end = {
            ...openingSequence.start
          };
          events[index][1].start = {
            ...closingSequence.end
          };
          nextEvents = [];

          // If there are more markers in the opening, add them before.
          if (events[open][1].end.offset - events[open][1].start.offset) {
            nextEvents = push(nextEvents, [['enter', events[open][1], context], ['exit', events[open][1], context]]);
          }

          // Opening.
          nextEvents = push(nextEvents, [['enter', group, context], ['enter', openingSequence, context], ['exit', openingSequence, context], ['enter', text, context]]);

          // Always populated by defaults.

          // Between.
          nextEvents = push(nextEvents, resolveAll(context.parser.constructs.insideSpan.null, events.slice(open + 1, index), context));

          // Closing.
          nextEvents = push(nextEvents, [['exit', text, context], ['enter', closingSequence, context], ['exit', closingSequence, context], ['exit', group, context]]);

          // If there are more markers in the closing, add them after.
          if (events[index][1].end.offset - events[index][1].start.offset) {
            offset = 2;
            nextEvents = push(nextEvents, [['enter', events[index][1], context], ['exit', events[index][1], context]]);
          } else {
            offset = 0;
          }
          splice(events, open - 1, index - open + 3, nextEvents);
          index = open + nextEvents.length - offset - 2;
          break;
        }
      }
    }
  }

  // Remove remaining sequences.
  index = -1;
  while (++index < events.length) {
    if (events[index][1].type === 'attentionSequence') {
      events[index][1].type = 'data';
    }
  }
  return events;
}

/**
 * @this {TokenizeContext}
 *   Context.
 * @type {Tokenizer}
 */
function tokenizeAttention(effects, ok) {
  const attentionMarkers = this.parser.constructs.attentionMarkers.null;
  const previous = this.previous;
  const before = classifyCharacter(previous);

  /** @type {NonNullable<Code>} */
  let marker;
  return start;

  /**
   * Before a sequence.
   *
   * ```markdown
   * > | **
   *     ^
   * ```
   *
   * @type {State}
   */
  function start(code) {
    marker = code;
    effects.enter('attentionSequence');
    return inside(code);
  }

  /**
   * In a sequence.
   *
   * ```markdown
   * > | **
   *     ^^
   * ```
   *
   * @type {State}
   */
  function inside(code) {
    if (code === marker) {
      effects.consume(code);
      return inside;
    }
    const token = effects.exit('attentionSequence');

    // To do: next major: move this to resolver, just like `markdown-rs`.
    const after = classifyCharacter(code);

    // Always populated by defaults.

    const open = !after || after === 2 && before || attentionMarkers.includes(code);
    const close = !before || before === 2 && after || attentionMarkers.includes(previous);
    token._open = Boolean(marker === 42 ? open : open && (before || !close));
    token._close = Boolean(marker === 42 ? close : close && (after || !open));
    return ok(code);
  }
}

/**
 * Move a point a bit.
 *
 * Note: `move` only works inside lines! It’s not possible to move past other
 * chunks (replacement characters, tabs, or line endings).
 *
 * @param {Point} point
 *   Point.
 * @param {number} offset
 *   Amount to move.
 * @returns {undefined}
 *   Nothing.
 */
function movePoint(point, offset) {
  point.column += offset;
  point.offset += offset;
  point._bufferIndex += offset;
}

/**
 * @import {
 *   Construct,
 *   State,
 *   TokenizeContext,
 *   Tokenizer
 * } from 'micromark-util-types'
 */

/** @type {Construct} */
const autolink = {
  name: 'autolink',
  tokenize: tokenizeAutolink
};

/**
 * @this {TokenizeContext}
 *   Context.
 * @type {Tokenizer}
 */
function tokenizeAutolink(effects, ok, nok) {
  let size = 0;
  return start;

  /**
   * Start of an autolink.
   *
   * ```markdown
   * > | a<https://example.com>b
   *      ^
   * > | a<user@example.com>b
   *      ^
   * ```
   *
   * @type {State}
   */
  function start(code) {
    effects.enter("autolink");
    effects.enter("autolinkMarker");
    effects.consume(code);
    effects.exit("autolinkMarker");
    effects.enter("autolinkProtocol");
    return open;
  }

  /**
   * After `<`, at protocol or atext.
   *
   * ```markdown
   * > | a<https://example.com>b
   *       ^
   * > | a<user@example.com>b
   *       ^
   * ```
   *
   * @type {State}
   */
  function open(code) {
    if (asciiAlpha(code)) {
      effects.consume(code);
      return schemeOrEmailAtext;
    }
    if (code === 64) {
      return nok(code);
    }
    return emailAtext(code);
  }

  /**
   * At second byte of protocol or atext.
   *
   * ```markdown
   * > | a<https://example.com>b
   *        ^
   * > | a<user@example.com>b
   *        ^
   * ```
   *
   * @type {State}
   */
  function schemeOrEmailAtext(code) {
    // ASCII alphanumeric and `+`, `-`, and `.`.
    if (code === 43 || code === 45 || code === 46 || asciiAlphanumeric(code)) {
      // Count the previous alphabetical from `open` too.
      size = 1;
      return schemeInsideOrEmailAtext(code);
    }
    return emailAtext(code);
  }

  /**
   * In ambiguous protocol or atext.
   *
   * ```markdown
   * > | a<https://example.com>b
   *        ^
   * > | a<user@example.com>b
   *        ^
   * ```
   *
   * @type {State}
   */
  function schemeInsideOrEmailAtext(code) {
    if (code === 58) {
      effects.consume(code);
      size = 0;
      return urlInside;
    }

    // ASCII alphanumeric and `+`, `-`, and `.`.
    if ((code === 43 || code === 45 || code === 46 || asciiAlphanumeric(code)) && size++ < 32) {
      effects.consume(code);
      return schemeInsideOrEmailAtext;
    }
    size = 0;
    return emailAtext(code);
  }

  /**
   * After protocol, in URL.
   *
   * ```markdown
   * > | a<https://example.com>b
   *             ^
   * ```
   *
   * @type {State}
   */
  function urlInside(code) {
    if (code === 62) {
      effects.exit("autolinkProtocol");
      effects.enter("autolinkMarker");
      effects.consume(code);
      effects.exit("autolinkMarker");
      effects.exit("autolink");
      return ok;
    }

    // ASCII control, space, or `<`.
    if (code === null || code === 32 || code === 60 || asciiControl(code)) {
      return nok(code);
    }
    effects.consume(code);
    return urlInside;
  }

  /**
   * In email atext.
   *
   * ```markdown
   * > | a<user.name@example.com>b
   *              ^
   * ```
   *
   * @type {State}
   */
  function emailAtext(code) {
    if (code === 64) {
      effects.consume(code);
      return emailAtSignOrDot;
    }
    if (asciiAtext(code)) {
      effects.consume(code);
      return emailAtext;
    }
    return nok(code);
  }

  /**
   * In label, after at-sign or dot.
   *
   * ```markdown
   * > | a<user.name@example.com>b
   *                 ^       ^
   * ```
   *
   * @type {State}
   */
  function emailAtSignOrDot(code) {
    return asciiAlphanumeric(code) ? emailLabel(code) : nok(code);
  }

  /**
   * In label, where `.` and `>` are allowed.
   *
   * ```markdown
   * > | a<user.name@example.com>b
   *                   ^
   * ```
   *
   * @type {State}
   */
  function emailLabel(code) {
    if (code === 46) {
      effects.consume(code);
      size = 0;
      return emailAtSignOrDot;
    }
    if (code === 62) {
      // Exit, then change the token type.
      effects.exit("autolinkProtocol").type = "autolinkEmail";
      effects.enter("autolinkMarker");
      effects.consume(code);
      effects.exit("autolinkMarker");
      effects.exit("autolink");
      return ok;
    }
    return emailValue(code);
  }

  /**
   * In label, where `.` and `>` are *not* allowed.
   *
   * Though, this is also used in `emailLabel` to parse other values.
   *
   * ```markdown
   * > | a<user.name@ex-ample.com>b
   *                    ^
   * ```
   *
   * @type {State}
   */
  function emailValue(code) {
    // ASCII alphanumeric or `-`.
    if ((code === 45 || asciiAlphanumeric(code)) && size++ < 63) {
      const next = code === 45 ? emailValue : emailLabel;
      effects.consume(code);
      return next;
    }
    return nok(code);
  }
}

/**
 * @import {
 *   Construct,
 *   State,
 *   TokenizeContext,
 *   Tokenizer
 * } from 'micromark-util-types'
 */

/** @type {Construct} */
const blankLine = {
  partial: true,
  tokenize: tokenizeBlankLine
};

/**
 * @this {TokenizeContext}
 *   Context.
 * @type {Tokenizer}
 */
function tokenizeBlankLine(effects, ok, nok) {
  return start;

  /**
   * Start of blank line.
   *
   * > 👉 **Note**: `␠` represents a space character.
   *
   * ```markdown
   * > | ␠␠␊
   *     ^
   * > | ␊
   *     ^
   * ```
   *
   * @type {State}
   */
  function start(code) {
    return markdownSpace(code) ? factorySpace(effects, after, "linePrefix")(code) : after(code);
  }

  /**
   * At eof/eol, after optional whitespace.
   *
   * > 👉 **Note**: `␠` represents a space character.
   *
   * ```markdown
   * > | ␠␠␊
   *       ^
   * > | ␊
   *     ^
   * ```
   *
   * @type {State}
   */
  function after(code) {
    return code === null || markdownLineEnding(code) ? ok(code) : nok(code);
  }
}

/**
 * @import {
 *   Construct,
 *   Exiter,
 *   State,
 *   TokenizeContext,
 *   Tokenizer
 * } from 'micromark-util-types'
 */

/** @type {Construct} */
const blockQuote = {
  continuation: {
    tokenize: tokenizeBlockQuoteContinuation
  },
  exit,
  name: 'blockQuote',
  tokenize: tokenizeBlockQuoteStart
};

/**
 * @this {TokenizeContext}
 *   Context.
 * @type {Tokenizer}
 */
function tokenizeBlockQuoteStart(effects, ok, nok) {
  const self = this;
  return start;

  /**
   * Start of block quote.
   *
   * ```markdown
   * > | > a
   *     ^
   * ```
   *
   * @type {State}
   */
  function start(code) {
    if (code === 62) {
      const state = self.containerState;
      if (!state.open) {
        effects.enter("blockQuote", {
          _container: true
        });
        state.open = true;
      }
      effects.enter("blockQuotePrefix");
      effects.enter("blockQuoteMarker");
      effects.consume(code);
      effects.exit("blockQuoteMarker");
      return after;
    }
    return nok(code);
  }

  /**
   * After `>`, before optional whitespace.
   *
   * ```markdown
   * > | > a
   *      ^
   * ```
   *
   * @type {State}
   */
  function after(code) {
    if (markdownSpace(code)) {
      effects.enter("blockQuotePrefixWhitespace");
      effects.consume(code);
      effects.exit("blockQuotePrefixWhitespace");
      effects.exit("blockQuotePrefix");
      return ok;
    }
    effects.exit("blockQuotePrefix");
    return ok(code);
  }
}

/**
 * Start of block quote continuation.
 *
 * ```markdown
 *   | > a
 * > | > b
 *     ^
 * ```
 *
 * @this {TokenizeContext}
 *   Context.
 * @type {Tokenizer}
 */
function tokenizeBlockQuoteContinuation(effects, ok, nok) {
  const self = this;
  return contStart;

  /**
   * Start of block quote continuation.
   *
   * Also used to parse the first block quote opening.
   *
   * ```markdown
   *   | > a
   * > | > b
   *     ^
   * ```
   *
   * @type {State}
   */
  function contStart(code) {
    if (markdownSpace(code)) {
      // Always populated by defaults.

      return factorySpace(effects, contBefore, "linePrefix", self.parser.constructs.disable.null.includes('codeIndented') ? undefined : 4)(code);
    }
    return contBefore(code);
  }

  /**
   * At `>`, after optional whitespace.
   *
   * Also used to parse the first block quote opening.
   *
   * ```markdown
   *   | > a
   * > | > b
   *     ^
   * ```
   *
   * @type {State}
   */
  function contBefore(code) {
    return effects.attempt(blockQuote, ok, nok)(code);
  }
}

/** @type {Exiter} */
function exit(effects) {
  effects.exit("blockQuote");
}

/**
 * @import {
 *   Construct,
 *   State,
 *   TokenizeContext,
 *   Tokenizer
 * } from 'micromark-util-types'
 */

/** @type {Construct} */
const characterEscape = {
  name: 'characterEscape',
  tokenize: tokenizeCharacterEscape
};

/**
 * @this {TokenizeContext}
 *   Context.
 * @type {Tokenizer}
 */
function tokenizeCharacterEscape(effects, ok, nok) {
  return start;

  /**
   * Start of character escape.
   *
   * ```markdown
   * > | a\*b
   *      ^
   * ```
   *
   * @type {State}
   */
  function start(code) {
    effects.enter("characterEscape");
    effects.enter("escapeMarker");
    effects.consume(code);
    effects.exit("escapeMarker");
    return inside;
  }

  /**
   * After `\`, at punctuation.
   *
   * ```markdown
   * > | a\*b
   *       ^
   * ```
   *
   * @type {State}
   */
  function inside(code) {
    // ASCII punctuation.
    if (asciiPunctuation(code)) {
      effects.enter("characterEscapeValue");
      effects.consume(code);
      effects.exit("characterEscapeValue");
      effects.exit("characterEscape");
      return ok;
    }
    return nok(code);
  }
}

/**
 * @import {
 *   Code,
 *   Construct,
 *   State,
 *   TokenizeContext,
 *   Tokenizer
 * } from 'micromark-util-types'
 */

/** @type {Construct} */
const characterReference = {
  name: 'characterReference',
  tokenize: tokenizeCharacterReference
};

/**
 * @this {TokenizeContext}
 *   Context.
 * @type {Tokenizer}
 */
function tokenizeCharacterReference(effects, ok, nok) {
  const self = this;
  let size = 0;
  /** @type {number} */
  let max;
  /** @type {(code: Code) => boolean} */
  let test;
  return start;

  /**
   * Start of character reference.
   *
   * ```markdown
   * > | a&amp;b
   *      ^
   * > | a&#123;b
   *      ^
   * > | a&#x9;b
   *      ^
   * ```
   *
   * @type {State}
   */
  function start(code) {
    effects.enter("characterReference");
    effects.enter("characterReferenceMarker");
    effects.consume(code);
    effects.exit("characterReferenceMarker");
    return open;
  }

  /**
   * After `&`, at `#` for numeric references or alphanumeric for named
   * references.
   *
   * ```markdown
   * > | a&amp;b
   *       ^
   * > | a&#123;b
   *       ^
   * > | a&#x9;b
   *       ^
   * ```
   *
   * @type {State}
   */
  function open(code) {
    if (code === 35) {
      effects.enter("characterReferenceMarkerNumeric");
      effects.consume(code);
      effects.exit("characterReferenceMarkerNumeric");
      return numeric;
    }
    effects.enter("characterReferenceValue");
    max = 31;
    test = asciiAlphanumeric;
    return value(code);
  }

  /**
   * After `#`, at `x` for hexadecimals or digit for decimals.
   *
   * ```markdown
   * > | a&#123;b
   *        ^
   * > | a&#x9;b
   *        ^
   * ```
   *
   * @type {State}
   */
  function numeric(code) {
    if (code === 88 || code === 120) {
      effects.enter("characterReferenceMarkerHexadecimal");
      effects.consume(code);
      effects.exit("characterReferenceMarkerHexadecimal");
      effects.enter("characterReferenceValue");
      max = 6;
      test = asciiHexDigit;
      return value;
    }
    effects.enter("characterReferenceValue");
    max = 7;
    test = asciiDigit;
    return value(code);
  }

  /**
   * After markers (`&#x`, `&#`, or `&`), in value, before `;`.
   *
   * The character reference kind defines what and how many characters are
   * allowed.
   *
   * ```markdown
   * > | a&amp;b
   *       ^^^
   * > | a&#123;b
   *        ^^^
   * > | a&#x9;b
   *         ^
   * ```
   *
   * @type {State}
   */
  function value(code) {
    if (code === 59 && size) {
      const token = effects.exit("characterReferenceValue");
      if (test === asciiAlphanumeric && !decodeNamedCharacterReference(self.sliceSerialize(token))) {
        return nok(code);
      }

      // To do: `markdown-rs` uses a different name:
      // `CharacterReferenceMarkerSemi`.
      effects.enter("characterReferenceMarker");
      effects.consume(code);
      effects.exit("characterReferenceMarker");
      effects.exit("characterReference");
      return ok;
    }
    if (test(code) && size++ < max) {
      effects.consume(code);
      return value;
    }
    return nok(code);
  }
}

/**
 * @import {
 *   Code,
 *   Construct,
 *   State,
 *   TokenizeContext,
 *   Tokenizer
 * } from 'micromark-util-types'
 */

/** @type {Construct} */
const nonLazyContinuation = {
  partial: true,
  tokenize: tokenizeNonLazyContinuation
};

/** @type {Construct} */
const codeFenced = {
  concrete: true,
  name: 'codeFenced',
  tokenize: tokenizeCodeFenced
};

/**
 * @this {TokenizeContext}
 *   Context.
 * @type {Tokenizer}
 */
function tokenizeCodeFenced(effects, ok, nok) {
  const self = this;
  /** @type {Construct} */
  const closeStart = {
    partial: true,
    tokenize: tokenizeCloseStart
  };
  let initialPrefix = 0;
  let sizeOpen = 0;
  /** @type {NonNullable<Code>} */
  let marker;
  return start;

  /**
   * Start of code.
   *
   * ```markdown
   * > | ~~~js
   *     ^
   *   | alert(1)
   *   | ~~~
   * ```
   *
   * @type {State}
   */
  function start(code) {
    // To do: parse whitespace like `markdown-rs`.
    return beforeSequenceOpen(code);
  }

  /**
   * In opening fence, after prefix, at sequence.
   *
   * ```markdown
   * > | ~~~js
   *     ^
   *   | alert(1)
   *   | ~~~
   * ```
   *
   * @type {State}
   */
  function beforeSequenceOpen(code) {
    const tail = self.events[self.events.length - 1];
    initialPrefix = tail && tail[1].type === "linePrefix" ? tail[2].sliceSerialize(tail[1], true).length : 0;
    marker = code;
    effects.enter("codeFenced");
    effects.enter("codeFencedFence");
    effects.enter("codeFencedFenceSequence");
    return sequenceOpen(code);
  }

  /**
   * In opening fence sequence.
   *
   * ```markdown
   * > | ~~~js
   *      ^
   *   | alert(1)
   *   | ~~~
   * ```
   *
   * @type {State}
   */
  function sequenceOpen(code) {
    if (code === marker) {
      sizeOpen++;
      effects.consume(code);
      return sequenceOpen;
    }
    if (sizeOpen < 3) {
      return nok(code);
    }
    effects.exit("codeFencedFenceSequence");
    return markdownSpace(code) ? factorySpace(effects, infoBefore, "whitespace")(code) : infoBefore(code);
  }

  /**
   * In opening fence, after the sequence (and optional whitespace), before info.
   *
   * ```markdown
   * > | ~~~js
   *        ^
   *   | alert(1)
   *   | ~~~
   * ```
   *
   * @type {State}
   */
  function infoBefore(code) {
    if (code === null || markdownLineEnding(code)) {
      effects.exit("codeFencedFence");
      return self.interrupt ? ok(code) : effects.check(nonLazyContinuation, atNonLazyBreak, after)(code);
    }
    effects.enter("codeFencedFenceInfo");
    effects.enter("chunkString", {
      contentType: "string"
    });
    return info(code);
  }

  /**
   * In info.
   *
   * ```markdown
   * > | ~~~js
   *        ^
   *   | alert(1)
   *   | ~~~
   * ```
   *
   * @type {State}
   */
  function info(code) {
    if (code === null || markdownLineEnding(code)) {
      effects.exit("chunkString");
      effects.exit("codeFencedFenceInfo");
      return infoBefore(code);
    }
    if (markdownSpace(code)) {
      effects.exit("chunkString");
      effects.exit("codeFencedFenceInfo");
      return factorySpace(effects, metaBefore, "whitespace")(code);
    }
    if (code === 96 && code === marker) {
      return nok(code);
    }
    effects.consume(code);
    return info;
  }

  /**
   * In opening fence, after info and whitespace, before meta.
   *
   * ```markdown
   * > | ~~~js eval
   *           ^
   *   | alert(1)
   *   | ~~~
   * ```
   *
   * @type {State}
   */
  function metaBefore(code) {
    if (code === null || markdownLineEnding(code)) {
      return infoBefore(code);
    }
    effects.enter("codeFencedFenceMeta");
    effects.enter("chunkString", {
      contentType: "string"
    });
    return meta(code);
  }

  /**
   * In meta.
   *
   * ```markdown
   * > | ~~~js eval
   *           ^
   *   | alert(1)
   *   | ~~~
   * ```
   *
   * @type {State}
   */
  function meta(code) {
    if (code === null || markdownLineEnding(code)) {
      effects.exit("chunkString");
      effects.exit("codeFencedFenceMeta");
      return infoBefore(code);
    }
    if (code === 96 && code === marker) {
      return nok(code);
    }
    effects.consume(code);
    return meta;
  }

  /**
   * At eol/eof in code, before a non-lazy closing fence or content.
   *
   * ```markdown
   * > | ~~~js
   *          ^
   * > | alert(1)
   *             ^
   *   | ~~~
   * ```
   *
   * @type {State}
   */
  function atNonLazyBreak(code) {
    return effects.attempt(closeStart, after, contentBefore)(code);
  }

  /**
   * Before code content, not a closing fence, at eol.
   *
   * ```markdown
   *   | ~~~js
   * > | alert(1)
   *             ^
   *   | ~~~
   * ```
   *
   * @type {State}
   */
  function contentBefore(code) {
    effects.enter("lineEnding");
    effects.consume(code);
    effects.exit("lineEnding");
    return contentStart;
  }

  /**
   * Before code content, not a closing fence.
   *
   * ```markdown
   *   | ~~~js
   * > | alert(1)
   *     ^
   *   | ~~~
   * ```
   *
   * @type {State}
   */
  function contentStart(code) {
    return initialPrefix > 0 && markdownSpace(code) ? factorySpace(effects, beforeContentChunk, "linePrefix", initialPrefix + 1)(code) : beforeContentChunk(code);
  }

  /**
   * Before code content, after optional prefix.
   *
   * ```markdown
   *   | ~~~js
   * > | alert(1)
   *     ^
   *   | ~~~
   * ```
   *
   * @type {State}
   */
  function beforeContentChunk(code) {
    if (code === null || markdownLineEnding(code)) {
      return effects.check(nonLazyContinuation, atNonLazyBreak, after)(code);
    }
    effects.enter("codeFlowValue");
    return contentChunk(code);
  }

  /**
   * In code content.
   *
   * ```markdown
   *   | ~~~js
   * > | alert(1)
   *     ^^^^^^^^
   *   | ~~~
   * ```
   *
   * @type {State}
   */
  function contentChunk(code) {
    if (code === null || markdownLineEnding(code)) {
      effects.exit("codeFlowValue");
      return beforeContentChunk(code);
    }
    effects.consume(code);
    return contentChunk;
  }

  /**
   * After code.
   *
   * ```markdown
   *   | ~~~js
   *   | alert(1)
   * > | ~~~
   *        ^
   * ```
   *
   * @type {State}
   */
  function after(code) {
    effects.exit("codeFenced");
    return ok(code);
  }

  /**
   * @this {TokenizeContext}
   *   Context.
   * @type {Tokenizer}
   */
  function tokenizeCloseStart(effects, ok, nok) {
    let size = 0;
    return startBefore;

    /**
     *
     *
     * @type {State}
     */
    function startBefore(code) {
      effects.enter("lineEnding");
      effects.consume(code);
      effects.exit("lineEnding");
      return start;
    }

    /**
     * Before closing fence, at optional whitespace.
     *
     * ```markdown
     *   | ~~~js
     *   | alert(1)
     * > | ~~~
     *     ^
     * ```
     *
     * @type {State}
     */
    function start(code) {
      // Always populated by defaults.

      // To do: `enter` here or in next state?
      effects.enter("codeFencedFence");
      return markdownSpace(code) ? factorySpace(effects, beforeSequenceClose, "linePrefix", self.parser.constructs.disable.null.includes('codeIndented') ? undefined : 4)(code) : beforeSequenceClose(code);
    }

    /**
     * In closing fence, after optional whitespace, at sequence.
     *
     * ```markdown
     *   | ~~~js
     *   | alert(1)
     * > | ~~~
     *     ^
     * ```
     *
     * @type {State}
     */
    function beforeSequenceClose(code) {
      if (code === marker) {
        effects.enter("codeFencedFenceSequence");
        return sequenceClose(code);
      }
      return nok(code);
    }

    /**
     * In closing fence sequence.
     *
     * ```markdown
     *   | ~~~js
     *   | alert(1)
     * > | ~~~
     *     ^
     * ```
     *
     * @type {State}
     */
    function sequenceClose(code) {
      if (code === marker) {
        size++;
        effects.consume(code);
        return sequenceClose;
      }
      if (size >= sizeOpen) {
        effects.exit("codeFencedFenceSequence");
        return markdownSpace(code) ? factorySpace(effects, sequenceCloseAfter, "whitespace")(code) : sequenceCloseAfter(code);
      }
      return nok(code);
    }

    /**
     * After closing fence sequence, after optional whitespace.
     *
     * ```markdown
     *   | ~~~js
     *   | alert(1)
     * > | ~~~
     *        ^
     * ```
     *
     * @type {State}
     */
    function sequenceCloseAfter(code) {
      if (code === null || markdownLineEnding(code)) {
        effects.exit("codeFencedFence");
        return ok(code);
      }
      return nok(code);
    }
  }
}

/**
 * @this {TokenizeContext}
 *   Context.
 * @type {Tokenizer}
 */
function tokenizeNonLazyContinuation(effects, ok, nok) {
  const self = this;
  return start;

  /**
   *
   *
   * @type {State}
   */
  function start(code) {
    if (code === null) {
      return nok(code);
    }
    effects.enter("lineEnding");
    effects.consume(code);
    effects.exit("lineEnding");
    return lineStart;
  }

  /**
   *
   *
   * @type {State}
   */
  function lineStart(code) {
    return self.parser.lazy[self.now().line] ? nok(code) : ok(code);
  }
}

/**
 * @import {
 *   Construct,
 *   State,
 *   TokenizeContext,
 *   Tokenizer
 * } from 'micromark-util-types'
 */

/** @type {Construct} */
const codeIndented = {
  name: 'codeIndented',
  tokenize: tokenizeCodeIndented
};

/** @type {Construct} */
const furtherStart = {
  partial: true,
  tokenize: tokenizeFurtherStart
};

/**
 * @this {TokenizeContext}
 *   Context.
 * @type {Tokenizer}
 */
function tokenizeCodeIndented(effects, ok, nok) {
  const self = this;
  return start;

  /**
   * Start of code (indented).
   *
   * > **Parsing note**: it is not needed to check if this first line is a
   * > filled line (that it has a non-whitespace character), because blank lines
   * > are parsed already, so we never run into that.
   *
   * ```markdown
   * > |     aaa
   *     ^
   * ```
   *
   * @type {State}
   */
  function start(code) {
    // To do: manually check if interrupting like `markdown-rs`.

    effects.enter("codeIndented");
    // To do: use an improved `space_or_tab` function like `markdown-rs`,
    // so that we can drop the next state.
    return factorySpace(effects, afterPrefix, "linePrefix", 4 + 1)(code);
  }

  /**
   * At start, after 1 or 4 spaces.
   *
   * ```markdown
   * > |     aaa
   *         ^
   * ```
   *
   * @type {State}
   */
  function afterPrefix(code) {
    const tail = self.events[self.events.length - 1];
    return tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4 ? atBreak(code) : nok(code);
  }

  /**
   * At a break.
   *
   * ```markdown
   * > |     aaa
   *         ^  ^
   * ```
   *
   * @type {State}
   */
  function atBreak(code) {
    if (code === null) {
      return after(code);
    }
    if (markdownLineEnding(code)) {
      return effects.attempt(furtherStart, atBreak, after)(code);
    }
    effects.enter("codeFlowValue");
    return inside(code);
  }

  /**
   * In code content.
   *
   * ```markdown
   * > |     aaa
   *         ^^^^
   * ```
   *
   * @type {State}
   */
  function inside(code) {
    if (code === null || markdownLineEnding(code)) {
      effects.exit("codeFlowValue");
      return atBreak(code);
    }
    effects.consume(code);
    return inside;
  }

  /** @type {State} */
  function after(code) {
    effects.exit("codeIndented");
    // To do: allow interrupting like `markdown-rs`.
    // Feel free to interrupt.
    // tokenizer.interrupt = false
    return ok(code);
  }
}

/**
 * @this {TokenizeContext}
 *   Context.
 * @type {Tokenizer}
 */
function tokenizeFurtherStart(effects, ok, nok) {
  const self = this;
  return furtherStart;

  /**
   * At eol, trying to parse another indent.
   *
   * ```markdown
   * > |     aaa
   *            ^
   *   |     bbb
   * ```
   *
   * @type {State}
   */
  function furtherStart(code) {
    // To do: improve `lazy` / `pierce` handling.
    // If this is a lazy line, it can’t be code.
    if (self.parser.lazy[self.now().line]) {
      return nok(code);
    }
    if (markdownLineEnding(code)) {
      effects.enter("lineEnding");
      effects.consume(code);
      effects.exit("lineEnding");
      return furtherStart;
    }

    // To do: the code here in `micromark-js` is a bit different from
    // `markdown-rs` because there it can attempt spaces.
    // We can’t yet.
    //
    // To do: use an improved `space_or_tab` function like `markdown-rs`,
    // so that we can drop the next state.
    return factorySpace(effects, afterPrefix, "linePrefix", 4 + 1)(code);
  }

  /**
   * At start, after 1 or 4 spaces.
   *
   * ```markdown
   * > |     aaa
   *         ^
   * ```
   *
   * @type {State}
   */
  function afterPrefix(code) {
    const tail = self.events[self.events.length - 1];
    return tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4 ? ok(code) : markdownLineEnding(code) ? furtherStart(code) : nok(code);
  }
}

/**
 * @import {
 *   Construct,
 *   Previous,
 *   Resolver,
 *   State,
 *   TokenizeContext,
 *   Tokenizer,
 *   Token
 * } from 'micromark-util-types'
 */

/** @type {Construct} */
const codeText = {
  name: 'codeText',
  previous,
  resolve: resolveCodeText,
  tokenize: tokenizeCodeText
};

// To do: next major: don’t resolve, like `markdown-rs`.
/** @type {Resolver} */
function resolveCodeText(events) {
  let tailExitIndex = events.length - 4;
  let headEnterIndex = 3;
  /** @type {number} */
  let index;
  /** @type {number | undefined} */
  let enter;

  // If we start and end with an EOL or a space.
  if ((events[headEnterIndex][1].type === "lineEnding" || events[headEnterIndex][1].type === 'space') && (events[tailExitIndex][1].type === "lineEnding" || events[tailExitIndex][1].type === 'space')) {
    index = headEnterIndex;

    // And we have data.
    while (++index < tailExitIndex) {
      if (events[index][1].type === "codeTextData") {
        // Then we have padding.
        events[headEnterIndex][1].type = "codeTextPadding";
        events[tailExitIndex][1].type = "codeTextPadding";
        headEnterIndex += 2;
        tailExitIndex -= 2;
        break;
      }
    }
  }

  // Merge adjacent spaces and data.
  index = headEnterIndex - 1;
  tailExitIndex++;
  while (++index <= tailExitIndex) {
    if (enter === undefined) {
      if (index !== tailExitIndex && events[index][1].type !== "lineEnding") {
        enter = index;
      }
    } else if (index === tailExitIndex || events[index][1].type === "lineEnding") {
      events[enter][1].type = "codeTextData";
      if (index !== enter + 2) {
        events[enter][1].end = events[index - 1][1].end;
        events.splice(enter + 2, index - enter - 2);
        tailExitIndex -= index - enter - 2;
        index = enter + 2;
      }
      enter = undefined;
    }
  }
  return events;
}

/**
 * @this {TokenizeContext}
 *   Context.
 * @type {Previous}
 */
function previous(code) {
  // If there is a previous code, there will always be a tail.
  return code !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}

/**
 * @this {TokenizeContext}
 *   Context.
 * @type {Tokenizer}
 */
function tokenizeCodeText(effects, ok, nok) {
  let sizeOpen = 0;
  /** @type {number} */
  let size;
  /** @type {Token} */
  let token;
  return start;

  /**
   * Start of code (text).
   *
   * ```markdown
   * > | `a`
   *     ^
   * > | \`a`
   *      ^
   * ```
   *
   * @type {State}
   */
  function start(code) {
    effects.enter("codeText");
    effects.enter("codeTextSequence");
    return sequenceOpen(code);
  }

  /**
   * In opening sequence.
   *
   * ```markdown
   * > | `a`
   *     ^
   * ```
   *
   * @type {State}
   */
  function sequenceOpen(code) {
    if (code === 96) {
      effects.consume(code);
      sizeOpen++;
      return sequenceOpen;
    }
    effects.exit("codeTextSequence");
    return between(code);
  }

  /**
   * Between something and something else.
   *
   * ```markdown
   * > | `a`
   *      ^^
   * ```
   *
   * @type {State}
   */
  function between(code) {
    // EOF.
    if (code === null) {
      return nok(code);
    }

    // To do: next major: don’t do spaces in resolve, but when compiling,
    // like `markdown-rs`.
    // Tabs don’t work, and virtual spaces don’t make sense.
    if (code === 32) {
      effects.enter('space');
      effects.consume(code);
      effects.exit('space');
      return between;
    }

    // Closing fence? Could also be data.
    if (code === 96) {
      token = effects.enter("codeTextSequence");
      size = 0;
      return sequenceClose(code);
    }
    if (markdownLineEnding(code)) {
      effects.enter("lineEnding");
      effects.consume(code);
      effects.exit("lineEnding");
      return between;
    }

    // Data.
    effects.enter("codeTextData");
    return data(code);
  }

  /**
   * In data.
   *
   * ```markdown
   * > | `a`
   *      ^
   * ```
   *
   * @type {State}
   */
  function data(code) {
    if (code === null || code === 32 || code === 96 || markdownLineEnding(code)) {
      effects.exit("codeTextData");
      return between(code);
    }
    effects.consume(code);
    return data;
  }

  /**
   * In closing sequence.
   *
   * ```markdown
   * > | `a`
   *       ^
   * ```
   *
   * @type {State}
   */
  function sequenceClose(code) {
    // More.
    if (code === 96) {
      effects.consume(code);
      size++;
      return sequenceClose;
    }

    // Done!
    if (size === sizeOpen) {
      effects.exit("codeTextSequence");
      effects.exit("codeText");
      return ok(code);
    }

    // More or less accents: mark as data.
    token.type = "codeTextData";
    return data(code);
  }
}

/**
 * Some of the internal operations of micromark do lots of editing
 * operations on very large arrays. This runs into problems with two
 * properties of most circa-2020 JavaScript interpreters:
 *
 *  - Array-length modifications at the high end of an array (push/pop) are
 *    expected to be common and are implemented in (amortized) time
 *    proportional to the number of elements added or removed, whereas
 *    other operations (shift/unshift and splice) are much less efficient.
 *  - Function arguments are passed on the stack, so adding tens of thousands
 *    of elements to an array with `arr.push(...newElements)` will frequently
 *    cause stack overflows. (see <https://stackoverflow.com/questions/22123769/rangeerror-maximum-call-stack-size-exceeded-why>)
 *
 * SpliceBuffers are an implementation of gap buffers, which are a
 * generalization of the "queue made of two stacks" idea. The splice buffer
 * maintains a cursor, and moving the cursor has cost proportional to the
 * distance the cursor moves, but inserting, deleting, or splicing in
 * new information at the cursor is as efficient as the push/pop operation.
 * This allows for an efficient sequence of splices (or pushes, pops, shifts,
 * or unshifts) as long such edits happen at the same part of the array or
 * generally sweep through the array from the beginning to the end.
 *
 * The interface for splice buffers also supports large numbers of inputs by
 * passing a single array argument rather passing multiple arguments on the
 * function call stack.
 *
 * @template T
 *   Item type.
 */
class SpliceBuffer {
  /**
   * @param {ReadonlyArray<T> | null | undefined} [initial]
   *   Initial items (optional).
   * @returns
   *   Splice buffer.
   */
  constructor(initial) {
    /** @type {Array<T>} */
    this.left = initial ? [...initial] : [];
    /** @type {Array<T>} */
    this.right = [];
  }

  /**
   * Array access;
   * does not move the cursor.
   *
   * @param {number} index
   *   Index.
   * @return {T}
   *   Item.
   */
  get(index) {
    if (index < 0 || index >= this.left.length + this.right.length) {
      throw new RangeError('Cannot access index `' + index + '` in a splice buffer of size `' + (this.left.length + this.right.length) + '`');
    }
    if (index < this.left.length) return this.left[index];
    return this.right[this.right.length - index + this.left.length - 1];
  }

  /**
   * The length of the splice buffer, one greater than the largest index in the
   * array.
   */
  get length() {
    return this.left.length + this.right.length;
  }

  /**
   * Remove and return `list[0]`;
   * moves the cursor to `0`.
   *
   * @returns {T | undefined}
   *   Item, optional.
   */
  shift() {
    this.setCursor(0);
    return this.right.pop();
  }

  /**
   * Slice the buffer to get an array;
   * does not move the cursor.
   *
   * @param {number} start
   *   Start.
   * @param {number | null | undefined} [end]
   *   End (optional).
   * @returns {Array<T>}
   *   Array of items.
   */
  slice(start, end) {
    /** @type {number} */
    const stop = end === null || end === undefined ? Number.POSITIVE_INFINITY : end;
    if (stop < this.left.length) {
      return this.left.slice(start, stop);
    }
    if (start > this.left.length) {
      return this.right.slice(this.right.length - stop + this.left.length, this.right.length - start + this.left.length).reverse();
    }
    return this.left.slice(start).concat(this.right.slice(this.right.length - stop + this.left.length).reverse());
  }

  /**
   * Mimics the behavior of Array.prototype.splice() except for the change of
   * interface necessary to avoid segfaults when patching in very large arrays.
   *
   * This operation moves cursor is moved to `start` and results in the cursor
   * placed after any inserted items.
   *
   * @param {number} start
   *   Start;
   *   zero-based index at which to start changing the array;
   *   negative numbers count backwards from the end of the array and values
   *   that are out-of bounds are clamped to the appropriate end of the array.
   * @param {number | null | undefined} [deleteCount=0]
   *   Delete count (default: `0`);
   *   maximum number of elements to delete, starting from start.
   * @param {Array<T> | null | undefined} [items=[]]
   *   Items to include in place of the deleted items (default: `[]`).
   * @return {Array<T>}
   *   Any removed items.
   */
  splice(start, deleteCount, items) {
    /** @type {number} */
    const count = deleteCount || 0;
    this.setCursor(Math.trunc(start));
    const removed = this.right.splice(this.right.length - count, Number.POSITIVE_INFINITY);
    if (items) chunkedPush(this.left, items);
    return removed.reverse();
  }

  /**
   * Remove and return the highest-numbered item in the array, so
   * `list[list.length - 1]`;
   * Moves the cursor to `length`.
   *
   * @returns {T | undefined}
   *   Item, optional.
   */
  pop() {
    this.setCursor(Number.POSITIVE_INFINITY);
    return this.left.pop();
  }

  /**
   * Inserts a single item to the high-numbered side of the array;
   * moves the cursor to `length`.
   *
   * @param {T} item
   *   Item.
   * @returns {undefined}
   *   Nothing.
   */
  push(item) {
    this.setCursor(Number.POSITIVE_INFINITY);
    this.left.push(item);
  }

  /**
   * Inserts many items to the high-numbered side of the array.
   * Moves the cursor to `length`.
   *
   * @param {Array<T>} items
   *   Items.
   * @returns {undefined}
   *   Nothing.
   */
  pushMany(items) {
    this.setCursor(Number.POSITIVE_INFINITY);
    chunkedPush(this.left, items);
  }

  /**
   * Inserts a single item to the low-numbered side of the array;
   * Moves the cursor to `0`.
   *
   * @param {T} item
   *   Item.
   * @returns {undefined}
   *   Nothing.
   */
  unshift(item) {
    this.setCursor(0);
    this.right.push(item);
  }

  /**
   * Inserts many items to the low-numbered side of the array;
   * moves the cursor to `0`.
   *
   * @param {Array<T>} items
   *   Items.
   * @returns {undefined}
   *   Nothing.
   */
  unshiftMany(items) {
    this.setCursor(0);
    chunkedPush(this.right, items.reverse());
  }

  /**
   * Move the cursor to a specific position in the array. Requires
   * time proportional to the distance moved.
   *
   * If `n < 0`, the cursor will end up at the beginning.
   * If `n > length`, the cursor will end up at the end.
   *
   * @param {number} n
   *   Position.
   * @return {undefined}
   *   Nothing.
   */
  setCursor(n) {
    if (n === this.left.length || n > this.left.length && this.right.length === 0 || n < 0 && this.left.length === 0) return;
    if (n < this.left.length) {
      // Move cursor to the this.left
      const removed = this.left.splice(n, Number.POSITIVE_INFINITY);
      chunkedPush(this.right, removed.reverse());
    } else {
      // Move cursor to the this.right
      const removed = this.right.splice(this.left.length + this.right.length - n, Number.POSITIVE_INFINITY);
      chunkedPush(this.left, removed.reverse());
    }
  }
}

/**
 * Avoid stack overflow by pushing items onto the stack in segments
 *
 * @template T
 *   Item type.
 * @param {Array<T>} list
 *   List to inject into.
 * @param {ReadonlyArray<T>} right
 *   Items to inject.
 * @return {undefined}
 *   Nothing.
 */
function chunkedPush(list, right) {
  /** @type {number} */
  let chunkStart = 0;
  if (right.length < 10000) {
    list.push(...right);
  } else {
    while (chunkStart < right.length) {
      list.push(...right.slice(chunkStart, chunkStart + 10000));
      chunkStart += 10000;
    }
  }
}

/**
 * @import {Chunk, Event, Token} from 'micromark-util-types'
 */


/**
 * Tokenize subcontent.
 *
 * @param {Array<Event>} eventsArray
 *   List of events.
 * @returns {boolean}
 *   Whether subtokens were found.
 */
// eslint-disable-next-line complexity
function subtokenize(eventsArray) {
  /** @type {Record<string, number>} */
  const jumps = {};
  let index = -1;
  /** @type {Event} */
  let event;
  /** @type {number | undefined} */
  let lineIndex;
  /** @type {number} */
  let otherIndex;
  /** @type {Event} */
  let otherEvent;
  /** @type {Array<Event>} */
  let parameters;
  /** @type {Array<Event>} */
  let subevents;
  /** @type {boolean | undefined} */
  let more;
  const events = new SpliceBuffer(eventsArray);
  while (++index < events.length) {
    while (index in jumps) {
      index = jumps[index];
    }
    event = events.get(index);

    // Add a hook for the GFM tasklist extension, which needs to know if text
    // is in the first content of a list item.
    if (index && event[1].type === "chunkFlow" && events.get(index - 1)[1].type === "listItemPrefix") {
      subevents = event[1]._tokenizer.events;
      otherIndex = 0;
      if (otherIndex < subevents.length && subevents[otherIndex][1].type === "lineEndingBlank") {
        otherIndex += 2;
      }
      if (otherIndex < subevents.length && subevents[otherIndex][1].type === "content") {
        while (++otherIndex < subevents.length) {
          if (subevents[otherIndex][1].type === "content") {
            break;
          }
          if (subevents[otherIndex][1].type === "chunkText") {
            subevents[otherIndex][1]._isInFirstContentOfListItem = true;
            otherIndex++;
          }
        }
      }
    }

    // Enter.
    if (event[0] === 'enter') {
      if (event[1].contentType) {
        Object.assign(jumps, subcontent(events, index));
        index = jumps[index];
        more = true;
      }
    }
    // Exit.
    else if (event[1]._container) {
      otherIndex = index;
      lineIndex = undefined;
      while (otherIndex--) {
        otherEvent = events.get(otherIndex);
        if (otherEvent[1].type === "lineEnding" || otherEvent[1].type === "lineEndingBlank") {
          if (otherEvent[0] === 'enter') {
            if (lineIndex) {
              events.get(lineIndex)[1].type = "lineEndingBlank";
            }
            otherEvent[1].type = "lineEnding";
            lineIndex = otherIndex;
          }
        } else if (otherEvent[1].type === "linePrefix" || otherEvent[1].type === "listItemIndent") ; else {
          break;
        }
      }
      if (lineIndex) {
        // Fix position.
        event[1].end = {
          ...events.get(lineIndex)[1].start
        };

        // Switch container exit w/ line endings.
        parameters = events.slice(lineIndex, index);
        parameters.unshift(event);
        events.splice(lineIndex, index - lineIndex + 1, parameters);
      }
    }
  }

  // The changes to the `events` buffer must be copied back into the eventsArray
  splice(eventsArray, 0, Number.POSITIVE_INFINITY, events.slice(0));
  return !more;
}

/**
 * Tokenize embedded tokens.
 *
 * @param {SpliceBuffer<Event>} events
 *   Events.
 * @param {number} eventIndex
 *   Index.
 * @returns {Record<string, number>}
 *   Gaps.
 */
function subcontent(events, eventIndex) {
  const token = events.get(eventIndex)[1];
  const context = events.get(eventIndex)[2];
  let startPosition = eventIndex - 1;
  /** @type {Array<number>} */
  const startPositions = [];
  let tokenizer = token._tokenizer;
  if (!tokenizer) {
    tokenizer = context.parser[token.contentType](token.start);
    if (token._contentTypeTextTrailing) {
      tokenizer._contentTypeTextTrailing = true;
    }
  }
  const childEvents = tokenizer.events;
  /** @type {Array<[number, number]>} */
  const jumps = [];
  /** @type {Record<string, number>} */
  const gaps = {};
  /** @type {Array<Chunk>} */
  let stream;
  /** @type {Token | undefined} */
  let previous;
  let index = -1;
  /** @type {Token | undefined} */
  let current = token;
  let adjust = 0;
  let start = 0;
  const breaks = [start];

  // Loop forward through the linked tokens to pass them in order to the
  // subtokenizer.
  while (current) {
    // Find the position of the event for this token.
    while (events.get(++startPosition)[1] !== current) {
      // Empty.
    }
    startPositions.push(startPosition);
    if (!current._tokenizer) {
      stream = context.sliceStream(current);
      if (!current.next) {
        stream.push(null);
      }
      if (previous) {
        tokenizer.defineSkip(current.start);
      }
      if (current._isInFirstContentOfListItem) {
        tokenizer._gfmTasklistFirstContentOfListItem = true;
      }
      tokenizer.write(stream);
      if (current._isInFirstContentOfListItem) {
        tokenizer._gfmTasklistFirstContentOfListItem = undefined;
      }
    }

    // Unravel the next token.
    previous = current;
    current = current.next;
  }

  // Now, loop back through all events (and linked tokens), to figure out which
  // parts belong where.
  current = token;
  while (++index < childEvents.length) {
    if (
    // Find a void token that includes a break.
    childEvents[index][0] === 'exit' && childEvents[index - 1][0] === 'enter' && childEvents[index][1].type === childEvents[index - 1][1].type && childEvents[index][1].start.line !== childEvents[index][1].end.line) {
      start = index + 1;
      breaks.push(start);
      // Help GC.
      current._tokenizer = undefined;
      current.previous = undefined;
      current = current.next;
    }
  }

  // Help GC.
  tokenizer.events = [];

  // If there’s one more token (which is the cases for lines that end in an
  // EOF), that’s perfect: the last point we found starts it.
  // If there isn’t then make sure any remaining content is added to it.
  if (current) {
    // Help GC.
    current._tokenizer = undefined;
    current.previous = undefined;
  } else {
    breaks.pop();
  }

  // Now splice the events from the subtokenizer into the current events,
  // moving back to front so that splice indices aren’t affected.
  index = breaks.length;
  while (index--) {
    const slice = childEvents.slice(breaks[index], breaks[index + 1]);
    const start = startPositions.pop();
    jumps.push([start, start + slice.length - 1]);
    events.splice(start, 2, slice);
  }
  jumps.reverse();
  index = -1;
  while (++index < jumps.length) {
    gaps[adjust + jumps[index][0]] = adjust + jumps[index][1];
    adjust += jumps[index][1] - jumps[index][0] - 1;
  }
  return gaps;
}

/**
 * @import {
 *   Construct,
 *   Resolver,
 *   State,
 *   TokenizeContext,
 *   Tokenizer,
 *   Token
 * } from 'micromark-util-types'
 */

/**
 * No name because it must not be turned off.
 * @type {Construct}
 */
const content = {
  resolve: resolveContent,
  tokenize: tokenizeContent
};

/** @type {Construct} */
const continuationConstruct = {
  partial: true,
  tokenize: tokenizeContinuation
};

/**
 * Content is transparent: it’s parsed right now. That way, definitions are also
 * parsed right now: before text in paragraphs (specifically, media) are parsed.
 *
 * @type {Resolver}
 */
function resolveContent(events) {
  subtokenize(events);
  return events;
}

/**
 * @this {TokenizeContext}
 *   Context.
 * @type {Tokenizer}
 */
function tokenizeContent(effects, ok) {
  /** @type {Token | undefined} */
  let previous;
  return chunkStart;

  /**
   * Before a content chunk.
   *
   * ```markdown
   * > | abc
   *     ^
   * ```
   *
   * @type {State}
   */
  function chunkStart(code) {
    effects.enter("content");
    previous = effects.enter("chunkContent", {
      contentType: "content"
    });
    return chunkInside(code);
  }

  /**
   * In a content chunk.
   *
   * ```markdown
   * > | abc
   *     ^^^
   * ```
   *
   * @type {State}
   */
  function chunkInside(code) {
    if (code === null) {
      return contentEnd(code);
    }

    // To do: in `markdown-rs`, each line is parsed on its own, and everything
    // is stitched together resolving.
    if (markdownLineEnding(code)) {
      return effects.check(continuationConstruct, contentContinue, contentEnd)(code);
    }

    // Data.
    effects.consume(code);
    return chunkInside;
  }

  /**
   *
   *
   * @type {State}
   */
  function contentEnd(code) {
    effects.exit("chunkContent");
    effects.exit("content");
    return ok(code);
  }

  /**
   *
   *
   * @type {State}
   */
  function contentContinue(code) {
    effects.consume(code);
    effects.exit("chunkContent");
    previous.next = effects.enter("chunkContent", {
      contentType: "content",
      previous
    });
    previous = previous.next;
    return chunkInside;
  }
}

/**
 * @this {TokenizeContext}
 *   Context.
 * @type {Tokenizer}
 */
function tokenizeContinuation(effects, ok, nok) {
  const self = this;
  return startLookahead;

  /**
   *
   *
   * @type {State}
   */
  function startLookahead(code) {
    effects.exit("chunkContent");
    effects.enter("lineEnding");
    effects.consume(code);
    effects.exit("lineEnding");
    return factorySpace(effects, prefixed, "linePrefix");
  }

  /**
   *
   *
   * @type {State}
   */
  function prefixed(code) {
    if (code === null || markdownLineEnding(code)) {
      return nok(code);
    }

    // Always populated by defaults.

    const tail = self.events[self.events.length - 1];
    if (!self.parser.constructs.disable.null.includes('codeIndented') && tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4) {
      return ok(code);
    }
    return effects.interrupt(self.parser.constructs.flow, nok, ok)(code);
  }
}

/**
 * @import {Effects, State, TokenType} from 'micromark-util-types'
 */

/**
 * Parse destinations.
 *
 * ###### Examples
 *
 * ```markdown
 * <a>
 * <a\>b>
 * <a b>
 * <a)>
 * a
 * a\)b
 * a(b)c
 * a(b)
 * ```
 *
 * @param {Effects} effects
 *   Context.
 * @param {State} ok
 *   State switched to when successful.
 * @param {State} nok
 *   State switched to when unsuccessful.
 * @param {TokenType} type
 *   Type for whole (`<a>` or `b`).
 * @param {TokenType} literalType
 *   Type when enclosed (`<a>`).
 * @param {TokenType} literalMarkerType
 *   Type for enclosing (`<` and `>`).
 * @param {TokenType} rawType
 *   Type when not enclosed (`b`).
 * @param {TokenType} stringType
 *   Type for the value (`a` or `b`).
 * @param {number | undefined} [max=Infinity]
 *   Depth of nested parens (inclusive).
 * @returns {State}
 *   Start state.
 */
function factoryDestination(effects, ok, nok, type, literalType, literalMarkerType, rawType, stringType, max) {
  const limit = max || Number.POSITIVE_INFINITY;
  let balance = 0;
  return start;

  /**
   * Start of destination.
   *
   * ```markdown
   * > | <aa>
   *     ^
   * > | aa
   *     ^
   * ```
   *
   * @type {State}
   */
  function start(code) {
    if (code === 60) {
      effects.enter(type);
      effects.enter(literalType);
      effects.enter(literalMarkerType);
      effects.consume(code);
      effects.exit(literalMarkerType);
      return enclosedBefore;
    }

    // ASCII control, space, closing paren.
    if (code === null || code === 32 || code === 41 || asciiControl(code)) {
      return nok(code);
    }
    effects.enter(type);
    effects.enter(rawType);
    effects.enter(stringType);
    effects.enter("chunkString", {
      contentType: "string"
    });
    return raw(code);
  }

  /**
   * After `<`, at an enclosed destination.
   *
   * ```markdown
   * > | <aa>
   *      ^
   * ```
   *
   * @type {State}
   */
  function enclosedBefore(code) {
    if (code === 62) {
      effects.enter(literalMarkerType);
      effects.consume(code);
      effects.exit(literalMarkerType);
      effects.exit(literalType);
      effects.exit(type);
      return ok;
    }
    effects.enter(stringType);
    effects.enter("chunkString", {
      contentType: "string"
    });
    return enclosed(code);
  }

  /**
   * In enclosed destination.
   *
   * ```markdown
   * > | <aa>
   *      ^
   * ```
   *
   * @type {State}
   */
  function enclosed(code) {
    if (code === 62) {
      effects.exit("chunkString");
      effects.exit(stringType);
      return enclosedBefore(code);
    }
    if (code === null || code === 60 || markdownLineEnding(code)) {
      return nok(code);
    }
    effects.consume(code);
    return code === 92 ? enclosedEscape : enclosed;
  }

  /**
   * After `\`, at a special character.
   *
   * ```markdown
   * > | <a\*a>
   *        ^
   * ```
   *
   * @type {State}
   */
  function enclosedEscape(code) {
    if (code === 60 || code === 62 || code === 92) {
      effects.consume(code);
      return enclosed;
    }
    return enclosed(code);
  }

  /**
   * In raw destination.
   *
   * ```markdown
   * > | aa
   *     ^
   * ```
   *
   * @type {State}
   */
  function raw(code) {
    if (!balance && (code === null || code === 41 || markdownLineEndingOrSpace(code))) {
      effects.exit("chunkString");
      effects.exit(stringType);
      effects.exit(rawType);
      effects.exit(type);
      return ok(code);
    }
    if (balance < limit && code === 40) {
      effects.consume(code);
      balance++;
      return raw;
    }
    if (code === 41) {
      effects.consume(code);
      balance--;
      return raw;
    }

    // ASCII control (but *not* `\0`) and space and `(`.
    // Note: in `markdown-rs`, `\0` exists in codes, in `micromark-js` it
    // doesn’t.
    if (code === null || code === 32 || code === 40 || asciiControl(code)) {
      return nok(code);
    }
    effects.consume(code);
    return code === 92 ? rawEscape : raw;
  }

  /**
   * After `\`, at special character.
   *
   * ```markdown
   * > | a\*a
   *       ^
   * ```
   *
   * @type {State}
   */
  function rawEscape(code) {
    if (code === 40 || code === 41 || code === 92) {
      effects.consume(code);
      return raw;
    }
    return raw(code);
  }
}

/**
 * @import {
 *   Effects,
 *   State,
 *   TokenizeContext,
 *   TokenType
 * } from 'micromark-util-types'
 */

/**
 * Parse labels.
 *
 * > 👉 **Note**: labels in markdown are capped at 999 characters in the string.
 *
 * ###### Examples
 *
 * ```markdown
 * [a]
 * [a
 * b]
 * [a\]b]
 * ```
 *
 * @this {TokenizeContext}
 *   Tokenize context.
 * @param {Effects} effects
 *   Context.
 * @param {State} ok
 *   State switched to when successful.
 * @param {State} nok
 *   State switched to when unsuccessful.
 * @param {TokenType} type
 *   Type of the whole label (`[a]`).
 * @param {TokenType} markerType
 *   Type for the markers (`[` and `]`).
 * @param {TokenType} stringType
 *   Type for the identifier (`a`).
 * @returns {State}
 *   Start state.
 */
function factoryLabel(effects, ok, nok, type, markerType, stringType) {
  const self = this;
  let size = 0;
  /** @type {boolean} */
  let seen;
  return start;

  /**
   * Start of label.
   *
   * ```markdown
   * > | [a]
   *     ^
   * ```
   *
   * @type {State}
   */
  function start(code) {
    effects.enter(type);
    effects.enter(markerType);
    effects.consume(code);
    effects.exit(markerType);
    effects.enter(stringType);
    return atBreak;
  }

  /**
   * In label, at something, before something else.
   *
   * ```markdown
   * > | [a]
   *      ^
   * ```
   *
   * @type {State}
   */
  function atBreak(code) {
    if (size > 999 || code === null || code === 91 || code === 93 && !seen ||
    // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    code === 94 && !size && '_hiddenFootnoteSupport' in self.parser.constructs) {
      return nok(code);
    }
    if (code === 93) {
      effects.exit(stringType);
      effects.enter(markerType);
      effects.consume(code);
      effects.exit(markerType);
      effects.exit(type);
      return ok;
    }

    // To do: indent? Link chunks and EOLs together?
    if (markdownLineEnding(code)) {
      effects.enter("lineEnding");
      effects.consume(code);
      effects.exit("lineEnding");
      return atBreak;
    }
    effects.enter("chunkString", {
      contentType: "string"
    });
    return labelInside(code);
  }

  /**
   * In label, in text.
   *
   * ```markdown
   * > | [a]
   *      ^
   * ```
   *
   * @type {State}
   */
  function labelInside(code) {
    if (code === null || code === 91 || code === 93 || markdownLineEnding(code) || size++ > 999) {
      effects.exit("chunkString");
      return atBreak(code);
    }
    effects.consume(code);
    if (!seen) seen = !markdownSpace(code);
    return code === 92 ? labelEscape : labelInside;
  }

  /**
   * After `\`, at a special character.
   *
   * ```markdown
   * > | [a\*a]
   *        ^
   * ```
   *
   * @type {State}
   */
  function labelEscape(code) {
    if (code === 91 || code === 92 || code === 93) {
      effects.consume(code);
      size++;
      return labelInside;
    }
    return labelInside(code);
  }
}

/**
 * @import {
 *   Code,
 *   Effects,
 *   State,
 *   TokenType
 * } from 'micromark-util-types'
 */

/**
 * Parse titles.
 *
 * ###### Examples
 *
 * ```markdown
 * "a"
 * 'b'
 * (c)
 * "a
 * b"
 * 'a
 *     b'
 * (a\)b)
 * ```
 *
 * @param {Effects} effects
 *   Context.
 * @param {State} ok
 *   State switched to when successful.
 * @param {State} nok
 *   State switched to when unsuccessful.
 * @param {TokenType} type
 *   Type of the whole title (`"a"`, `'b'`, `(c)`).
 * @param {TokenType} markerType
 *   Type for the markers (`"`, `'`, `(`, and `)`).
 * @param {TokenType} stringType
 *   Type for the value (`a`).
 * @returns {State}
 *   Start state.
 */
function factoryTitle(effects, ok, nok, type, markerType, stringType) {
  /** @type {NonNullable<Code>} */
  let marker;
  return start;

  /**
   * Start of title.
   *
   * ```markdown
   * > | "a"
   *     ^
   * ```
   *
   * @type {State}
   */
  function start(code) {
    if (code === 34 || code === 39 || code === 40) {
      effects.enter(type);
      effects.enter(markerType);
      effects.consume(code);
      effects.exit(markerType);
      marker = code === 40 ? 41 : code;
      return begin;
    }
    return nok(code);
  }

  /**
   * After opening marker.
   *
   * This is also used at the closing marker.
   *
   * ```markdown
   * > | "a"
   *      ^
   * ```
   *
   * @type {State}
   */
  function begin(code) {
    if (code === marker) {
      effects.enter(markerType);
      effects.consume(code);
      effects.exit(markerType);
      effects.exit(type);
      return ok;
    }
    effects.enter(stringType);
    return atBreak(code);
  }

  /**
   * At something, before something else.
   *
   * ```markdown
   * > | "a"
   *      ^
   * ```
   *
   * @type {State}
   */
  function atBreak(code) {
    if (code === marker) {
      effects.exit(stringType);
      return begin(marker);
    }
    if (code === null) {
      return nok(code);
    }

    // Note: blank lines can’t exist in content.
    if (markdownLineEnding(code)) {
      // To do: use `space_or_tab_eol_with_options`, connect.
      effects.enter("lineEnding");
      effects.consume(code);
      effects.exit("lineEnding");
      return factorySpace(effects, atBreak, "linePrefix");
    }
    effects.enter("chunkString", {
      contentType: "string"
    });
    return inside(code);
  }

  /**
   *
   *
   * @type {State}
   */
  function inside(code) {
    if (code === marker || code === null || markdownLineEnding(code)) {
      effects.exit("chunkString");
      return atBreak(code);
    }
    effects.consume(code);
    return code === 92 ? escape : inside;
  }

  /**
   * After `\`, at a special character.
   *
   * ```markdown
   * > | "a\*b"
   *      ^
   * ```
   *
   * @type {State}
   */
  function escape(code) {
    if (code === marker || code === 92) {
      effects.consume(code);
      return inside;
    }
    return inside(code);
  }
}

/**
 * @import {Effects, State} from 'micromark-util-types'
 */

/**
 * Parse spaces and tabs.
 *
 * There is no `nok` parameter:
 *
 * *   line endings or spaces in markdown are often optional, in which case this
 *     factory can be used and `ok` will be switched to whether spaces were found
 *     or not
 * *   one line ending or space can be detected with
 *     `markdownLineEndingOrSpace(code)` right before using `factoryWhitespace`
 *
 * @param {Effects} effects
 *   Context.
 * @param {State} ok
 *   State switched to when successful.
 * @returns {State}
 *   Start state.
 */
function factoryWhitespace(effects, ok) {
  /** @type {boolean} */
  let seen;
  return start;

  /** @type {State} */
  function start(code) {
    if (markdownLineEnding(code)) {
      effects.enter("lineEnding");
      effects.consume(code);
      effects.exit("lineEnding");
      seen = true;
      return start;
    }
    if (markdownSpace(code)) {
      return factorySpace(effects, start, seen ? "linePrefix" : "lineSuffix")(code);
    }
    return ok(code);
  }
}

/**
 * @import {
 *   Construct,
 *   State,
 *   TokenizeContext,
 *   Tokenizer
 * } from 'micromark-util-types'
 */

/** @type {Construct} */
const definition = {
  name: 'definition',
  tokenize: tokenizeDefinition
};

/** @type {Construct} */
const titleBefore = {
  partial: true,
  tokenize: tokenizeTitleBefore
};

/**
 * @this {TokenizeContext}
 *   Context.
 * @type {Tokenizer}
 */
function tokenizeDefinition(effects, ok, nok) {
  const self = this;
  /** @type {string} */
  let identifier;
  return start;

  /**
   * At start of a definition.
   *
   * ```markdown
   * > | [a]: b "c"
   *     ^
   * ```
   *
   * @type {State}
   */
  function start(code) {
    // Do not interrupt paragraphs (but do follow definitions).
    // To do: do `interrupt` the way `markdown-rs` does.
    // To do: parse whitespace the way `markdown-rs` does.
    effects.enter("definition");
    return before(code);
  }

  /**
   * After optional whitespace, at `[`.
   *
   * ```markdown
   * > | [a]: b "c"
   *     ^
   * ```
   *
   * @type {State}
   */
  function before(code) {
    // To do: parse whitespace the way `markdown-rs` does.

    return factoryLabel.call(self, effects, labelAfter,
    // Note: we don’t need to reset the way `markdown-rs` does.
    nok, "definitionLabel", "definitionLabelMarker", "definitionLabelString")(code);
  }

  /**
   * After label.
   *
   * ```markdown
   * > | [a]: b "c"
   *        ^
   * ```
   *
   * @type {State}
   */
  function labelAfter(code) {
    identifier = normalizeIdentifier(self.sliceSerialize(self.events[self.events.length - 1][1]).slice(1, -1));
    if (code === 58) {
      effects.enter("definitionMarker");
      effects.consume(code);
      effects.exit("definitionMarker");
      return markerAfter;
    }
    return nok(code);
  }

  /**
   * After marker.
   *
   * ```markdown
   * > | [a]: b "c"
   *         ^
   * ```
   *
   * @type {State}
   */
  function markerAfter(code) {
    // Note: whitespace is optional.
    return markdownLineEndingOrSpace(code) ? factoryWhitespace(effects, destinationBefore)(code) : destinationBefore(code);
  }

  /**
   * Before destination.
   *
   * ```markdown
   * > | [a]: b "c"
   *          ^
   * ```
   *
   * @type {State}
   */
  function destinationBefore(code) {
    return factoryDestination(effects, destinationAfter,
    // Note: we don’t need to reset the way `markdown-rs` does.
    nok, "definitionDestination", "definitionDestinationLiteral", "definitionDestinationLiteralMarker", "definitionDestinationRaw", "definitionDestinationString")(code);
  }

  /**
   * After destination.
   *
   * ```markdown
   * > | [a]: b "c"
   *           ^
   * ```
   *
   * @type {State}
   */
  function destinationAfter(code) {
    return effects.attempt(titleBefore, after, after)(code);
  }

  /**
   * After definition.
   *
   * ```markdown
   * > | [a]: b
   *           ^
   * > | [a]: b "c"
   *               ^
   * ```
   *
   * @type {State}
   */
  function after(code) {
    return markdownSpace(code) ? factorySpace(effects, afterWhitespace, "whitespace")(code) : afterWhitespace(code);
  }

  /**
   * After definition, after optional whitespace.
   *
   * ```markdown
   * > | [a]: b
   *           ^
   * > | [a]: b "c"
   *               ^
   * ```
   *
   * @type {State}
   */
  function afterWhitespace(code) {
    if (code === null || markdownLineEnding(code)) {
      effects.exit("definition");

      // Note: we don’t care about uniqueness.
      // It’s likely that that doesn’t happen very frequently.
      // It is more likely that it wastes precious time.
      self.parser.defined.push(identifier);

      // To do: `markdown-rs` interrupt.
      // // You’d be interrupting.
      // tokenizer.interrupt = true
      return ok(code);
    }
    return nok(code);
  }
}

/**
 * @this {TokenizeContext}
 *   Context.
 * @type {Tokenizer}
 */
function tokenizeTitleBefore(effects, ok, nok) {
  return titleBefore;

  /**
   * After destination, at whitespace.
   *
   * ```markdown
   * > | [a]: b
   *           ^
   * > | [a]: b "c"
   *           ^
   * ```
   *
   * @type {State}
   */
  function titleBefore(code) {
    return markdownLineEndingOrSpace(code) ? factoryWhitespace(effects, beforeMarker)(code) : nok(code);
  }

  /**
   * At title.
   *
   * ```markdown
   *   | [a]: b
   * > | "c"
   *     ^
   * ```
   *
   * @type {State}
   */
  function beforeMarker(code) {
    return factoryTitle(effects, titleAfter, nok, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(code);
  }

  /**
   * After title.
   *
   * ```markdown
   * > | [a]: b "c"
   *               ^
   * ```
   *
   * @type {State}
   */
  function titleAfter(code) {
    return markdownSpace(code) ? factorySpace(effects, titleAfterOptionalWhitespace, "whitespace")(code) : titleAfterOptionalWhitespace(code);
  }

  /**
   * After title, after optional whitespace.
   *
   * ```markdown
   * > | [a]: b "c"
   *               ^
   * ```
   *
   * @type {State}
   */
  function titleAfterOptionalWhitespace(code) {
    return code === null || markdownLineEnding(code) ? ok(code) : nok(code);
  }
}

/**
 * @import {
 *   Construct,
 *   State,
 *   TokenizeContext,
 *   Tokenizer
 * } from 'micromark-util-types'
 */

/** @type {Construct} */
const hardBreakEscape = {
  name: 'hardBreakEscape',
  tokenize: tokenizeHardBreakEscape
};

/**
 * @this {TokenizeContext}
 *   Context.
 * @type {Tokenizer}
 */
function tokenizeHardBreakEscape(effects, ok, nok) {
  return start;

  /**
   * Start of a hard break (escape).
   *
   * ```markdown
   * > | a\
   *      ^
   *   | b
   * ```
   *
   * @type {State}
   */
  function start(code) {
    effects.enter("hardBreakEscape");
    effects.consume(code);
    return after;
  }

  /**
   * After `\`, at eol.
   *
   * ```markdown
   * > | a\
   *       ^
   *   | b
   * ```
   *
   *  @type {State}
   */
  function after(code) {
    if (markdownLineEnding(code)) {
      effects.exit("hardBreakEscape");
      return ok(code);
    }
    return nok(code);
  }
}

/**
 * @import {
 *   Construct,
 *   Resolver,
 *   State,
 *   TokenizeContext,
 *   Tokenizer,
 *   Token
 * } from 'micromark-util-types'
 */

/** @type {Construct} */
const headingAtx = {
  name: 'headingAtx',
  resolve: resolveHeadingAtx,
  tokenize: tokenizeHeadingAtx
};

/** @type {Resolver} */
function resolveHeadingAtx(events, context) {
  let contentEnd = events.length - 2;
  let contentStart = 3;
  /** @type {Token} */
  let content;
  /** @type {Token} */
  let text;

  // Prefix whitespace, part of the opening.
  if (events[contentStart][1].type === "whitespace") {
    contentStart += 2;
  }

  // Suffix whitespace, part of the closing.
  if (contentEnd - 2 > contentStart && events[contentEnd][1].type === "whitespace") {
    contentEnd -= 2;
  }
  if (events[contentEnd][1].type === "atxHeadingSequence" && (contentStart === contentEnd - 1 || contentEnd - 4 > contentStart && events[contentEnd - 2][1].type === "whitespace")) {
    contentEnd -= contentStart + 1 === contentEnd ? 2 : 4;
  }
  if (contentEnd > contentStart) {
    content = {
      type: "atxHeadingText",
      start: events[contentStart][1].start,
      end: events[contentEnd][1].end
    };
    text = {
      type: "chunkText",
      start: events[contentStart][1].start,
      end: events[contentEnd][1].end,
      contentType: "text"
    };
    splice(events, contentStart, contentEnd - contentStart + 1, [['enter', content, context], ['enter', text, context], ['exit', text, context], ['exit', content, context]]);
  }
  return events;
}

/**
 * @this {TokenizeContext}
 *   Context.
 * @type {Tokenizer}
 */
function tokenizeHeadingAtx(effects, ok, nok) {
  let size = 0;
  return start;

  /**
   * Start of a heading (atx).
   *
   * ```markdown
   * > | ## aa
   *     ^
   * ```
   *
   * @type {State}
   */
  function start(code) {
    // To do: parse indent like `markdown-rs`.
    effects.enter("atxHeading");
    return before(code);
  }

  /**
   * After optional whitespace, at `#`.
   *
   * ```markdown
   * > | ## aa
   *     ^
   * ```
   *
   * @type {State}
   */
  function before(code) {
    effects.enter("atxHeadingSequence");
    return sequenceOpen(code);
  }

  /**
   * In opening sequence.
   *
   * ```markdown
   * > | ## aa
   *     ^
   * ```
   *
   * @type {State}
   */
  function sequenceOpen(code) {
    if (code === 35 && size++ < 6) {
      effects.consume(code);
      return sequenceOpen;
    }

    // Always at least one `#`.
    if (code === null || markdownLineEndingOrSpace(code)) {
      effects.exit("atxHeadingSequence");
      return atBreak(code);
    }
    return nok(code);
  }

  /**
   * After something, before something else.
   *
   * ```markdown
   * > | ## aa
   *       ^
   * ```
   *
   * @type {State}
   */
  function atBreak(code) {
    if (code === 35) {
      effects.enter("atxHeadingSequence");
      return sequenceFurther(code);
    }
    if (code === null || markdownLineEnding(code)) {
      effects.exit("atxHeading");
      // To do: interrupt like `markdown-rs`.
      // // Feel free to interrupt.
      // tokenizer.interrupt = false
      return ok(code);
    }
    if (markdownSpace(code)) {
      return factorySpace(effects, atBreak, "whitespace")(code);
    }

    // To do: generate `data` tokens, add the `text` token later.
    // Needs edit map, see: `markdown.rs`.
    effects.enter("atxHeadingText");
    return data(code);
  }

  /**
   * In further sequence (after whitespace).
   *
   * Could be normal “visible” hashes in the heading or a final sequence.
   *
   * ```markdown
   * > | ## aa ##
   *           ^
   * ```
   *
   * @type {State}
   */
  function sequenceFurther(code) {
    if (code === 35) {
      effects.consume(code);
      return sequenceFurther;
    }
    effects.exit("atxHeadingSequence");
    return atBreak(code);
  }

  /**
   * In text.
   *
   * ```markdown
   * > | ## aa
   *        ^
   * ```
   *
   * @type {State}
   */
  function data(code) {
    if (code === null || code === 35 || markdownLineEndingOrSpace(code)) {
      effects.exit("atxHeadingText");
      return atBreak(code);
    }
    effects.consume(code);
    return data;
  }
}

/**
 * List of lowercase HTML “block” tag names.
 *
 * The list, when parsing HTML (flow), results in more relaxed rules (condition
 * 6).
 * Because they are known blocks, the HTML-like syntax doesn’t have to be
 * strictly parsed.
 * For tag names not in this list, a more strict algorithm (condition 7) is used
 * to detect whether the HTML-like syntax is seen as HTML (flow) or not.
 *
 * This is copied from:
 * <https://spec.commonmark.org/0.30/#html-blocks>.
 *
 * > 👉 **Note**: `search` was added in `CommonMark@0.31`.
 */
const htmlBlockNames = [
  'address',
  'article',
  'aside',
  'base',
  'basefont',
  'blockquote',
  'body',
  'caption',
  'center',
  'col',
  'colgroup',
  'dd',
  'details',
  'dialog',
  'dir',
  'div',
  'dl',
  'dt',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'frame',
  'frameset',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'head',
  'header',
  'hr',
  'html',
  'iframe',
  'legend',
  'li',
  'link',
  'main',
  'menu',
  'menuitem',
  'nav',
  'noframes',
  'ol',
  'optgroup',
  'option',
  'p',
  'param',
  'search',
  'section',
  'summary',
  'table',
  'tbody',
  'td',
  'tfoot',
  'th',
  'thead',
  'title',
  'tr',
  'track',
  'ul'
];

/**
 * List of lowercase HTML “raw” tag names.
 *
 * The list, when parsing HTML (flow), results in HTML that can include lines
 * without exiting, until a closing tag also in this list is found (condition
 * 1).
 *
 * This module is copied from:
 * <https://spec.commonmark.org/0.30/#html-blocks>.
 *
 * > 👉 **Note**: `textarea` was added in `CommonMark@0.30`.
 */
const htmlRawNames = ['pre', 'script', 'style', 'textarea'];

/**
 * @import {
 *   Code,
 *   Construct,
 *   Resolver,
 *   State,
 *   TokenizeContext,
 *   Tokenizer
 * } from 'micromark-util-types'
 */


/** @type {Construct} */
const htmlFlow = {
  concrete: true,
  name: 'htmlFlow',
  resolveTo: resolveToHtmlFlow,
  tokenize: tokenizeHtmlFlow
};

/** @type {Construct} */
const blankLineBefore = {
  partial: true,
  tokenize: tokenizeBlankLineBefore
};
const nonLazyContinuationStart = {
  partial: true,
  tokenize: tokenizeNonLazyContinuationStart
};

/** @type {Resolver} */
function resolveToHtmlFlow(events) {
  let index = events.length;
  while (index--) {
    if (events[index][0] === 'enter' && events[index][1].type === "htmlFlow") {
      break;
    }
  }
  if (index > 1 && events[index - 2][1].type === "linePrefix") {
    // Add the prefix start to the HTML token.
    events[index][1].start = events[index - 2][1].start;
    // Add the prefix start to the HTML line token.
    events[index + 1][1].start = events[index - 2][1].start;
    // Remove the line prefix.
    events.splice(index - 2, 2);
  }
  return events;
}

/**
 * @this {TokenizeContext}
 *   Context.
 * @type {Tokenizer}
 */
function tokenizeHtmlFlow(effects, ok, nok) {
  const self = this;
  /** @type {number} */
  let marker;
  /** @type {boolean} */
  let closingTag;
  /** @type {string} */
  let buffer;
  /** @type {number} */
  let index;
  /** @type {Code} */
  let markerB;
  return start;

  /**
   * Start of HTML (flow).
   *
   * ```markdown
   * > | <x />
   *     ^
   * ```
   *
   * @type {State}
   */
  function start(code) {
    // To do: parse indent like `markdown-rs`.
    return before(code);
  }

  /**
   * At `<`, after optional whitespace.
   *
   * ```markdown
   * > | <x />
   *     ^
   * ```
   *
   * @type {State}
   */
  function before(code) {
    effects.enter("htmlFlow");
    effects.enter("htmlFlowData");
    effects.consume(code);
    return open;
  }

  /**
   * After `<`, at tag name or other stuff.
   *
   * ```markdown
   * > | <x />
   *      ^
   * > | <!doctype>
   *      ^
   * > | <!--xxx-->
   *      ^
   * ```
   *
   * @type {State}
   */
  function open(code) {
    if (code === 33) {
      effects.consume(code);
      return declarationOpen;
    }
    if (code === 47) {
      effects.consume(code);
      closingTag = true;
      return tagCloseStart;
    }
    if (code === 63) {
      effects.consume(code);
      marker = 3;
      // To do:
      // tokenizer.concrete = true
      // To do: use `markdown-rs` style interrupt.
      // While we’re in an instruction instead of a declaration, we’re on a `?`
      // right now, so we do need to search for `>`, similar to declarations.
      return self.interrupt ? ok : continuationDeclarationInside;
    }

    // ASCII alphabetical.
    if (asciiAlpha(code)) {
      // Always the case.
      effects.consume(code);
      buffer = String.fromCharCode(code);
      return tagName;
    }
    return nok(code);
  }

  /**
   * After `<!`, at declaration, comment, or CDATA.
   *
   * ```markdown
   * > | <!doctype>
   *       ^
   * > | <!--xxx-->
   *       ^
   * > | <![CDATA[>&<]]>
   *       ^
   * ```
   *
   * @type {State}
   */
  function declarationOpen(code) {
    if (code === 45) {
      effects.consume(code);
      marker = 2;
      return commentOpenInside;
    }
    if (code === 91) {
      effects.consume(code);
      marker = 5;
      index = 0;
      return cdataOpenInside;
    }

    // ASCII alphabetical.
    if (asciiAlpha(code)) {
      effects.consume(code);
      marker = 4;
      // // Do not form containers.
      // tokenizer.concrete = true
      return self.interrupt ? ok : continuationDeclarationInside;
    }
    return nok(code);
  }

  /**
   * After `<!-`, inside a comment, at another `-`.
   *
   * ```markdown
   * > | <!--xxx-->
   *        ^
   * ```
   *
   * @type {State}
   */
  function commentOpenInside(code) {
    if (code === 45) {
      effects.consume(code);
      // // Do not form containers.
      // tokenizer.concrete = true
      return self.interrupt ? ok : continuationDeclarationInside;
    }
    return nok(code);
  }

  /**
   * After `<![`, inside CDATA, expecting `CDATA[`.
   *
   * ```markdown
   * > | <![CDATA[>&<]]>
   *        ^^^^^^
   * ```
   *
   * @type {State}
   */
  function cdataOpenInside(code) {
    const value = "CDATA[";
    if (code === value.charCodeAt(index++)) {
      effects.consume(code);
      if (index === value.length) {
        // // Do not form containers.
        // tokenizer.concrete = true
        return self.interrupt ? ok : continuation;
      }
      return cdataOpenInside;
    }
    return nok(code);
  }

  /**
   * After `</`, in closing tag, at tag name.
   *
   * ```markdown
   * > | </x>
   *       ^
   * ```
   *
   * @type {State}
   */
  function tagCloseStart(code) {
    if (asciiAlpha(code)) {
      // Always the case.
      effects.consume(code);
      buffer = String.fromCharCode(code);
      return tagName;
    }
    return nok(code);
  }

  /**
   * In tag name.
   *
   * ```markdown
   * > | <ab>
   *      ^^
   * > | </ab>
   *       ^^
   * ```
   *
   * @type {State}
   */
  function tagName(code) {
    if (code === null || code === 47 || code === 62 || markdownLineEndingOrSpace(code)) {
      const slash = code === 47;
      const name = buffer.toLowerCase();
      if (!slash && !closingTag && htmlRawNames.includes(name)) {
        marker = 1;
        // // Do not form containers.
        // tokenizer.concrete = true
        return self.interrupt ? ok(code) : continuation(code);
      }
      if (htmlBlockNames.includes(buffer.toLowerCase())) {
        marker = 6;
        if (slash) {
          effects.consume(code);
          return basicSelfClosing;
        }

        // // Do not form containers.
        // tokenizer.concrete = true
        return self.interrupt ? ok(code) : continuation(code);
      }
      marker = 7;
      // Do not support complete HTML when interrupting.
      return self.interrupt && !self.parser.lazy[self.now().line] ? nok(code) : closingTag ? completeClosingTagAfter(code) : completeAttributeNameBefore(code);
    }

    // ASCII alphanumerical and `-`.
    if (code === 45 || asciiAlphanumeric(code)) {
      effects.consume(code);
      buffer += String.fromCharCode(code);
      return tagName;
    }
    return nok(code);
  }

  /**
   * After closing slash of a basic tag name.
   *
   * ```markdown
   * > | <div/>
   *          ^
   * ```
   *
   * @type {State}
   */
  function basicSelfClosing(code) {
    if (code === 62) {
      effects.consume(code);
      // // Do not form containers.
      // tokenizer.concrete = true
      return self.interrupt ? ok : continuation;
    }
    return nok(code);
  }

  /**
   * After closing slash of a complete tag name.
   *
   * ```markdown
   * > | <x/>
   *        ^
   * ```
   *
   * @type {State}
   */
  function completeClosingTagAfter(code) {
    if (markdownSpace(code)) {
      effects.consume(code);
      return completeClosingTagAfter;
    }
    return completeEnd(code);
  }

  /**
   * At an attribute name.
   *
   * At first, this state is used after a complete tag name, after whitespace,
   * where it expects optional attributes or the end of the tag.
   * It is also reused after attributes, when expecting more optional
   * attributes.
   *
   * ```markdown
   * > | <a />
   *        ^
   * > | <a :b>
   *        ^
   * > | <a _b>
   *        ^
   * > | <a b>
   *        ^
   * > | <a >
   *        ^
   * ```
   *
   * @type {State}
   */
  function completeAttributeNameBefore(code) {
    if (code === 47) {
      effects.consume(code);
      return completeEnd;
    }

    // ASCII alphanumerical and `:` and `_`.
    if (code === 58 || code === 95 || asciiAlpha(code)) {
      effects.consume(code);
      return completeAttributeName;
    }
    if (markdownSpace(code)) {
      effects.consume(code);
      return completeAttributeNameBefore;
    }
    return completeEnd(code);
  }

  /**
   * In attribute name.
   *
   * ```markdown
   * > | <a :b>
   *         ^
   * > | <a _b>
   *         ^
   * > | <a b>
   *         ^
   * ```
   *
   * @type {State}
   */
  function completeAttributeName(code) {
    // ASCII alphanumerical and `-`, `.`, `:`, and `_`.
    if (code === 45 || code === 46 || code === 58 || code === 95 || asciiAlphanumeric(code)) {
      effects.consume(code);
      return completeAttributeName;
    }
    return completeAttributeNameAfter(code);
  }

  /**
   * After attribute name, at an optional initializer, the end of the tag, or
   * whitespace.
   *
   * ```markdown
   * > | <a b>
   *         ^
   * > | <a b=c>
   *         ^
   * ```
   *
   * @type {State}
   */
  function completeAttributeNameAfter(code) {
    if (code === 61) {
      effects.consume(code);
      return completeAttributeValueBefore;
    }
    if (markdownSpace(code)) {
      effects.consume(code);
      return completeAttributeNameAfter;
    }
    return completeAttributeNameBefore(code);
  }

  /**
   * Before unquoted, double quoted, or single quoted attribute value, allowing
   * whitespace.
   *
   * ```markdown
   * > | <a b=c>
   *          ^
   * > | <a b="c">
   *          ^
   * ```
   *
   * @type {State}
   */
  function completeAttributeValueBefore(code) {
    if (code === null || code === 60 || code === 61 || code === 62 || code === 96) {
      return nok(code);
    }
    if (code === 34 || code === 39) {
      effects.consume(code);
      markerB = code;
      return completeAttributeValueQuoted;
    }
    if (markdownSpace(code)) {
      effects.consume(code);
      return completeAttributeValueBefore;
    }
    return completeAttributeValueUnquoted(code);
  }

  /**
   * In double or single quoted attribute value.
   *
   * ```markdown
   * > | <a b="c">
   *           ^
   * > | <a b='c'>
   *           ^
   * ```
   *
   * @type {State}
   */
  function completeAttributeValueQuoted(code) {
    if (code === markerB) {
      effects.consume(code);
      markerB = null;
      return completeAttributeValueQuotedAfter;
    }
    if (code === null || markdownLineEnding(code)) {
      return nok(code);
    }
    effects.consume(code);
    return completeAttributeValueQuoted;
  }

  /**
   * In unquoted attribute value.
   *
   * ```markdown
   * > | <a b=c>
   *          ^
   * ```
   *
   * @type {State}
   */
  function completeAttributeValueUnquoted(code) {
    if (code === null || code === 34 || code === 39 || code === 47 || code === 60 || code === 61 || code === 62 || code === 96 || markdownLineEndingOrSpace(code)) {
      return completeAttributeNameAfter(code);
    }
    effects.consume(code);
    return completeAttributeValueUnquoted;
  }

  /**
   * After double or single quoted attribute value, before whitespace or the
   * end of the tag.
   *
   * ```markdown
   * > | <a b="c">
   *            ^
   * ```
   *
   * @type {State}
   */
  function completeAttributeValueQuotedAfter(code) {
    if (code === 47 || code === 62 || markdownSpace(code)) {
      return completeAttributeNameBefore(code);
    }
    return nok(code);
  }

  /**
   * In certain circumstances of a complete tag where only an `>` is allowed.
   *
   * ```markdown
   * > | <a b="c">
   *             ^
   * ```
   *
   * @type {State}
   */
  function completeEnd(code) {
    if (code === 62) {
      effects.consume(code);
      return completeAfter;
    }
    return nok(code);
  }

  /**
   * After `>` in a complete tag.
   *
   * ```markdown
   * > | <x>
   *        ^
   * ```
   *
   * @type {State}
   */
  function completeAfter(code) {
    if (code === null || markdownLineEnding(code)) {
      // // Do not form containers.
      // tokenizer.concrete = true
      return continuation(code);
    }
    if (markdownSpace(code)) {
      effects.consume(code);
      return completeAfter;
    }
    return nok(code);
  }

  /**
   * In continuation of any HTML kind.
   *
   * ```markdown
   * > | <!--xxx-->
   *          ^
   * ```
   *
   * @type {State}
   */
  function continuation(code) {
    if (code === 45 && marker === 2) {
      effects.consume(code);
      return continuationCommentInside;
    }
    if (code === 60 && marker === 1) {
      effects.consume(code);
      return continuationRawTagOpen;
    }
    if (code === 62 && marker === 4) {
      effects.consume(code);
      return continuationClose;
    }
    if (code === 63 && marker === 3) {
      effects.consume(code);
      return continuationDeclarationInside;
    }
    if (code === 93 && marker === 5) {
      effects.consume(code);
      return continuationCdataInside;
    }
    if (markdownLineEnding(code) && (marker === 6 || marker === 7)) {
      effects.exit("htmlFlowData");
      return effects.check(blankLineBefore, continuationAfter, continuationStart)(code);
    }
    if (code === null || markdownLineEnding(code)) {
      effects.exit("htmlFlowData");
      return continuationStart(code);
    }
    effects.consume(code);
    return continuation;
  }

  /**
   * In continuation, at eol.
   *
   * ```markdown
   * > | <x>
   *        ^
   *   | asd
   * ```
   *
   * @type {State}
   */
  function continuationStart(code) {
    return effects.check(nonLazyContinuationStart, continuationStartNonLazy, continuationAfter)(code);
  }

  /**
   * In continuation, at eol, before non-lazy content.
   *
   * ```markdown
   * > | <x>
   *        ^
   *   | asd
   * ```
   *
   * @type {State}
   */
  function continuationStartNonLazy(code) {
    effects.enter("lineEnding");
    effects.consume(code);
    effects.exit("lineEnding");
    return continuationBefore;
  }

  /**
   * In continuation, before non-lazy content.
   *
   * ```markdown
   *   | <x>
   * > | asd
   *     ^
   * ```
   *
   * @type {State}
   */
  function continuationBefore(code) {
    if (code === null || markdownLineEnding(code)) {
      return continuationStart(code);
    }
    effects.enter("htmlFlowData");
    return continuation(code);
  }

  /**
   * In comment continuation, after one `-`, expecting another.
   *
   * ```markdown
   * > | <!--xxx-->
   *             ^
   * ```
   *
   * @type {State}
   */
  function continuationCommentInside(code) {
    if (code === 45) {
      effects.consume(code);
      return continuationDeclarationInside;
    }
    return continuation(code);
  }

  /**
   * In raw continuation, after `<`, at `/`.
   *
   * ```markdown
   * > | <script>console.log(1)</script>
   *                            ^
   * ```
   *
   * @type {State}
   */
  function continuationRawTagOpen(code) {
    if (code === 47) {
      effects.consume(code);
      buffer = '';
      return continuationRawEndTag;
    }
    return continuation(code);
  }

  /**
   * In raw continuation, after `</`, in a raw tag name.
   *
   * ```markdown
   * > | <script>console.log(1)</script>
   *                             ^^^^^^
   * ```
   *
   * @type {State}
   */
  function continuationRawEndTag(code) {
    if (code === 62) {
      const name = buffer.toLowerCase();
      if (htmlRawNames.includes(name)) {
        effects.consume(code);
        return continuationClose;
      }
      return continuation(code);
    }
    if (asciiAlpha(code) && buffer.length < 8) {
      // Always the case.
      effects.consume(code);
      buffer += String.fromCharCode(code);
      return continuationRawEndTag;
    }
    return continuation(code);
  }

  /**
   * In cdata continuation, after `]`, expecting `]>`.
   *
   * ```markdown
   * > | <![CDATA[>&<]]>
   *                  ^
   * ```
   *
   * @type {State}
   */
  function continuationCdataInside(code) {
    if (code === 93) {
      effects.consume(code);
      return continuationDeclarationInside;
    }
    return continuation(code);
  }

  /**
   * In declaration or instruction continuation, at `>`.
   *
   * ```markdown
   * > | <!-->
   *         ^
   * > | <?>
   *       ^
   * > | <!q>
   *        ^
   * > | <!--ab-->
   *             ^
   * > | <![CDATA[>&<]]>
   *                   ^
   * ```
   *
   * @type {State}
   */
  function continuationDeclarationInside(code) {
    if (code === 62) {
      effects.consume(code);
      return continuationClose;
    }

    // More dashes.
    if (code === 45 && marker === 2) {
      effects.consume(code);
      return continuationDeclarationInside;
    }
    return continuation(code);
  }

  /**
   * In closed continuation: everything we get until the eol/eof is part of it.
   *
   * ```markdown
   * > | <!doctype>
   *               ^
   * ```
   *
   * @type {State}
   */
  function continuationClose(code) {
    if (code === null || markdownLineEnding(code)) {
      effects.exit("htmlFlowData");
      return continuationAfter(code);
    }
    effects.consume(code);
    return continuationClose;
  }

  /**
   * Done.
   *
   * ```markdown
   * > | <!doctype>
   *               ^
   * ```
   *
   * @type {State}
   */
  function continuationAfter(code) {
    effects.exit("htmlFlow");
    // // Feel free to interrupt.
    // tokenizer.interrupt = false
    // // No longer concrete.
    // tokenizer.concrete = false
    return ok(code);
  }
}

/**
 * @this {TokenizeContext}
 *   Context.
 * @type {Tokenizer}
 */
function tokenizeNonLazyContinuationStart(effects, ok, nok) {
  const self = this;
  return start;

  /**
   * At eol, before continuation.
   *
   * ```markdown
   * > | * ```js
   *            ^
   *   | b
   * ```
   *
   * @type {State}
   */
  function start(code) {
    if (markdownLineEnding(code)) {
      effects.enter("lineEnding");
      effects.consume(code);
      effects.exit("lineEnding");
      return after;
    }
    return nok(code);
  }

  /**
   * A continuation.
   *
   * ```markdown
   *   | * ```js
   * > | b
   *     ^
   * ```
   *
   * @type {State}
   */
  function after(code) {
    return self.parser.lazy[self.now().line] ? nok(code) : ok(code);
  }
}

/**
 * @this {TokenizeContext}
 *   Context.
 * @type {Tokenizer}
 */
function tokenizeBlankLineBefore(effects, ok, nok) {
  return start;

  /**
   * Before eol, expecting blank line.
   *
   * ```markdown
   * > | <div>
   *          ^
   *   |
   * ```
   *
   * @type {State}
   */
  function start(code) {
    effects.enter("lineEnding");
    effects.consume(code);
    effects.exit("lineEnding");
    return effects.attempt(blankLine, ok, nok);
  }
}

/**
 * @import {
 *   Code,
 *   Construct,
 *   State,
 *   TokenizeContext,
 *   Tokenizer
 * } from 'micromark-util-types'
 */

/** @type {Construct} */
const htmlText = {
  name: 'htmlText',
  tokenize: tokenizeHtmlText
};

/**
 * @this {TokenizeContext}
 *   Context.
 * @type {Tokenizer}
 */
function tokenizeHtmlText(effects, ok, nok) {
  const self = this;
  /** @type {NonNullable<Code> | undefined} */
  let marker;
  /** @type {number} */
  let index;
  /** @type {State} */
  let returnState;
  return start;

  /**
   * Start of HTML (text).
   *
   * ```markdown
   * > | a <b> c
   *       ^
   * ```
   *
   * @type {State}
   */
  function start(code) {
    effects.enter("htmlText");
    effects.enter("htmlTextData");
    effects.consume(code);
    return open;
  }

  /**
   * After `<`, at tag name or other stuff.
   *
   * ```markdown
   * > | a <b> c
   *        ^
   * > | a <!doctype> c
   *        ^
   * > | a <!--b--> c
   *        ^
   * ```
   *
   * @type {State}
   */
  function open(code) {
    if (code === 33) {
      effects.consume(code);
      return declarationOpen;
    }
    if (code === 47) {
      effects.consume(code);
      return tagCloseStart;
    }
    if (code === 63) {
      effects.consume(code);
      return instruction;
    }

    // ASCII alphabetical.
    if (asciiAlpha(code)) {
      effects.consume(code);
      return tagOpen;
    }
    return nok(code);
  }

  /**
   * After `<!`, at declaration, comment, or CDATA.
   *
   * ```markdown
   * > | a <!doctype> c
   *         ^
   * > | a <!--b--> c
   *         ^
   * > | a <![CDATA[>&<]]> c
   *         ^
   * ```
   *
   * @type {State}
   */
  function declarationOpen(code) {
    if (code === 45) {
      effects.consume(code);
      return commentOpenInside;
    }
    if (code === 91) {
      effects.consume(code);
      index = 0;
      return cdataOpenInside;
    }
    if (asciiAlpha(code)) {
      effects.consume(code);
      return declaration;
    }
    return nok(code);
  }

  /**
   * In a comment, after `<!-`, at another `-`.
   *
   * ```markdown
   * > | a <!--b--> c
   *          ^
   * ```
   *
   * @type {State}
   */
  function commentOpenInside(code) {
    if (code === 45) {
      effects.consume(code);
      return commentEnd;
    }
    return nok(code);
  }

  /**
   * In comment.
   *
   * ```markdown
   * > | a <!--b--> c
   *           ^
   * ```
   *
   * @type {State}
   */
  function comment(code) {
    if (code === null) {
      return nok(code);
    }
    if (code === 45) {
      effects.consume(code);
      return commentClose;
    }
    if (markdownLineEnding(code)) {
      returnState = comment;
      return lineEndingBefore(code);
    }
    effects.consume(code);
    return comment;
  }

  /**
   * In comment, after `-`.
   *
   * ```markdown
   * > | a <!--b--> c
   *             ^
   * ```
   *
   * @type {State}
   */
  function commentClose(code) {
    if (code === 45) {
      effects.consume(code);
      return commentEnd;
    }
    return comment(code);
  }

  /**
   * In comment, after `--`.
   *
   * ```markdown
   * > | a <!--b--> c
   *              ^
   * ```
   *
   * @type {State}
   */
  function commentEnd(code) {
    return code === 62 ? end(code) : code === 45 ? commentClose(code) : comment(code);
  }

  /**
   * After `<![`, in CDATA, expecting `CDATA[`.
   *
   * ```markdown
   * > | a <![CDATA[>&<]]> b
   *          ^^^^^^
   * ```
   *
   * @type {State}
   */
  function cdataOpenInside(code) {
    const value = "CDATA[";
    if (code === value.charCodeAt(index++)) {
      effects.consume(code);
      return index === value.length ? cdata : cdataOpenInside;
    }
    return nok(code);
  }

  /**
   * In CDATA.
   *
   * ```markdown
   * > | a <![CDATA[>&<]]> b
   *                ^^^
   * ```
   *
   * @type {State}
   */
  function cdata(code) {
    if (code === null) {
      return nok(code);
    }
    if (code === 93) {
      effects.consume(code);
      return cdataClose;
    }
    if (markdownLineEnding(code)) {
      returnState = cdata;
      return lineEndingBefore(code);
    }
    effects.consume(code);
    return cdata;
  }

  /**
   * In CDATA, after `]`, at another `]`.
   *
   * ```markdown
   * > | a <![CDATA[>&<]]> b
   *                    ^
   * ```
   *
   * @type {State}
   */
  function cdataClose(code) {
    if (code === 93) {
      effects.consume(code);
      return cdataEnd;
    }
    return cdata(code);
  }

  /**
   * In CDATA, after `]]`, at `>`.
   *
   * ```markdown
   * > | a <![CDATA[>&<]]> b
   *                     ^
   * ```
   *
   * @type {State}
   */
  function cdataEnd(code) {
    if (code === 62) {
      return end(code);
    }
    if (code === 93) {
      effects.consume(code);
      return cdataEnd;
    }
    return cdata(code);
  }

  /**
   * In declaration.
   *
   * ```markdown
   * > | a <!b> c
   *          ^
   * ```
   *
   * @type {State}
   */
  function declaration(code) {
    if (code === null || code === 62) {
      return end(code);
    }
    if (markdownLineEnding(code)) {
      returnState = declaration;
      return lineEndingBefore(code);
    }
    effects.consume(code);
    return declaration;
  }

  /**
   * In instruction.
   *
   * ```markdown
   * > | a <?b?> c
   *         ^
   * ```
   *
   * @type {State}
   */
  function instruction(code) {
    if (code === null) {
      return nok(code);
    }
    if (code === 63) {
      effects.consume(code);
      return instructionClose;
    }
    if (markdownLineEnding(code)) {
      returnState = instruction;
      return lineEndingBefore(code);
    }
    effects.consume(code);
    return instruction;
  }

  /**
   * In instruction, after `?`, at `>`.
   *
   * ```markdown
   * > | a <?b?> c
   *           ^
   * ```
   *
   * @type {State}
   */
  function instructionClose(code) {
    return code === 62 ? end(code) : instruction(code);
  }

  /**
   * After `</`, in closing tag, at tag name.
   *
   * ```markdown
   * > | a </b> c
   *         ^
   * ```
   *
   * @type {State}
   */
  function tagCloseStart(code) {
    // ASCII alphabetical.
    if (asciiAlpha(code)) {
      effects.consume(code);
      return tagClose;
    }
    return nok(code);
  }

  /**
   * After `</x`, in a tag name.
   *
   * ```markdown
   * > | a </b> c
   *          ^
   * ```
   *
   * @type {State}
   */
  function tagClose(code) {
    // ASCII alphanumerical and `-`.
    if (code === 45 || asciiAlphanumeric(code)) {
      effects.consume(code);
      return tagClose;
    }
    return tagCloseBetween(code);
  }

  /**
   * In closing tag, after tag name.
   *
   * ```markdown
   * > | a </b> c
   *          ^
   * ```
   *
   * @type {State}
   */
  function tagCloseBetween(code) {
    if (markdownLineEnding(code)) {
      returnState = tagCloseBetween;
      return lineEndingBefore(code);
    }
    if (markdownSpace(code)) {
      effects.consume(code);
      return tagCloseBetween;
    }
    return end(code);
  }

  /**
   * After `<x`, in opening tag name.
   *
   * ```markdown
   * > | a <b> c
   *         ^
   * ```
   *
   * @type {State}
   */
  function tagOpen(code) {
    // ASCII alphanumerical and `-`.
    if (code === 45 || asciiAlphanumeric(code)) {
      effects.consume(code);
      return tagOpen;
    }
    if (code === 47 || code === 62 || markdownLineEndingOrSpace(code)) {
      return tagOpenBetween(code);
    }
    return nok(code);
  }

  /**
   * In opening tag, after tag name.
   *
   * ```markdown
   * > | a <b> c
   *         ^
   * ```
   *
   * @type {State}
   */
  function tagOpenBetween(code) {
    if (code === 47) {
      effects.consume(code);
      return end;
    }

    // ASCII alphabetical and `:` and `_`.
    if (code === 58 || code === 95 || asciiAlpha(code)) {
      effects.consume(code);
      return tagOpenAttributeName;
    }
    if (markdownLineEnding(code)) {
      returnState = tagOpenBetween;
      return lineEndingBefore(code);
    }
    if (markdownSpace(code)) {
      effects.consume(code);
      return tagOpenBetween;
    }
    return end(code);
  }

  /**
   * In attribute name.
   *
   * ```markdown
   * > | a <b c> d
   *          ^
   * ```
   *
   * @type {State}
   */
  function tagOpenAttributeName(code) {
    // ASCII alphabetical and `-`, `.`, `:`, and `_`.
    if (code === 45 || code === 46 || code === 58 || code === 95 || asciiAlphanumeric(code)) {
      effects.consume(code);
      return tagOpenAttributeName;
    }
    return tagOpenAttributeNameAfter(code);
  }

  /**
   * After attribute name, before initializer, the end of the tag, or
   * whitespace.
   *
   * ```markdown
   * > | a <b c> d
   *           ^
   * ```
   *
   * @type {State}
   */
  function tagOpenAttributeNameAfter(code) {
    if (code === 61) {
      effects.consume(code);
      return tagOpenAttributeValueBefore;
    }
    if (markdownLineEnding(code)) {
      returnState = tagOpenAttributeNameAfter;
      return lineEndingBefore(code);
    }
    if (markdownSpace(code)) {
      effects.consume(code);
      return tagOpenAttributeNameAfter;
    }
    return tagOpenBetween(code);
  }

  /**
   * Before unquoted, double quoted, or single quoted attribute value, allowing
   * whitespace.
   *
   * ```markdown
   * > | a <b c=d> e
   *            ^
   * ```
   *
   * @type {State}
   */
  function tagOpenAttributeValueBefore(code) {
    if (code === null || code === 60 || code === 61 || code === 62 || code === 96) {
      return nok(code);
    }
    if (code === 34 || code === 39) {
      effects.consume(code);
      marker = code;
      return tagOpenAttributeValueQuoted;
    }
    if (markdownLineEnding(code)) {
      returnState = tagOpenAttributeValueBefore;
      return lineEndingBefore(code);
    }
    if (markdownSpace(code)) {
      effects.consume(code);
      return tagOpenAttributeValueBefore;
    }
    effects.consume(code);
    return tagOpenAttributeValueUnquoted;
  }

  /**
   * In double or single quoted attribute value.
   *
   * ```markdown
   * > | a <b c="d"> e
   *             ^
   * ```
   *
   * @type {State}
   */
  function tagOpenAttributeValueQuoted(code) {
    if (code === marker) {
      effects.consume(code);
      marker = undefined;
      return tagOpenAttributeValueQuotedAfter;
    }
    if (code === null) {
      return nok(code);
    }
    if (markdownLineEnding(code)) {
      returnState = tagOpenAttributeValueQuoted;
      return lineEndingBefore(code);
    }
    effects.consume(code);
    return tagOpenAttributeValueQuoted;
  }

  /**
   * In unquoted attribute value.
   *
   * ```markdown
   * > | a <b c=d> e
   *            ^
   * ```
   *
   * @type {State}
   */
  function tagOpenAttributeValueUnquoted(code) {
    if (code === null || code === 34 || code === 39 || code === 60 || code === 61 || code === 96) {
      return nok(code);
    }
    if (code === 47 || code === 62 || markdownLineEndingOrSpace(code)) {
      return tagOpenBetween(code);
    }
    effects.consume(code);
    return tagOpenAttributeValueUnquoted;
  }

  /**
   * After double or single quoted attribute value, before whitespace or the end
   * of the tag.
   *
   * ```markdown
   * > | a <b c="d"> e
   *               ^
   * ```
   *
   * @type {State}
   */
  function tagOpenAttributeValueQuotedAfter(code) {
    if (code === 47 || code === 62 || markdownLineEndingOrSpace(code)) {
      return tagOpenBetween(code);
    }
    return nok(code);
  }

  /**
   * In certain circumstances of a tag where only an `>` is allowed.
   *
   * ```markdown
   * > | a <b c="d"> e
   *               ^
   * ```
   *
   * @type {State}
   */
  function end(code) {
    if (code === 62) {
      effects.consume(code);
      effects.exit("htmlTextData");
      effects.exit("htmlText");
      return ok;
    }
    return nok(code);
  }

  /**
   * At eol.
   *
   * > 👉 **Note**: we can’t have blank lines in text, so no need to worry about
   * > empty tokens.
   *
   * ```markdown
   * > | a <!--a
   *            ^
   *   | b-->
   * ```
   *
   * @type {State}
   */
  function lineEndingBefore(code) {
    effects.exit("htmlTextData");
    effects.enter("lineEnding");
    effects.consume(code);
    effects.exit("lineEnding");
    return lineEndingAfter;
  }

  /**
   * After eol, at optional whitespace.
   *
   * > 👉 **Note**: we can’t have blank lines in text, so no need to worry about
   * > empty tokens.
   *
   * ```markdown
   *   | a <!--a
   * > | b-->
   *     ^
   * ```
   *
   * @type {State}
   */
  function lineEndingAfter(code) {
    // Always populated by defaults.

    return markdownSpace(code) ? factorySpace(effects, lineEndingAfterPrefix, "linePrefix", self.parser.constructs.disable.null.includes('codeIndented') ? undefined : 4)(code) : lineEndingAfterPrefix(code);
  }

  /**
   * After eol, after optional whitespace.
   *
   * > 👉 **Note**: we can’t have blank lines in text, so no need to worry about
   * > empty tokens.
   *
   * ```markdown
   *   | a <!--a
   * > | b-->
   *     ^
   * ```
   *
   * @type {State}
   */
  function lineEndingAfterPrefix(code) {
    effects.enter("htmlTextData");
    return returnState(code);
  }
}

/**
 * @import {
 *   Construct,
 *   Event,
 *   Resolver,
 *   State,
 *   TokenizeContext,
 *   Tokenizer,
 *   Token
 * } from 'micromark-util-types'
 */

/** @type {Construct} */
const labelEnd = {
  name: 'labelEnd',
  resolveAll: resolveAllLabelEnd,
  resolveTo: resolveToLabelEnd,
  tokenize: tokenizeLabelEnd
};

/** @type {Construct} */
const resourceConstruct = {
  tokenize: tokenizeResource
};
/** @type {Construct} */
const referenceFullConstruct = {
  tokenize: tokenizeReferenceFull
};
/** @type {Construct} */
const referenceCollapsedConstruct = {
  tokenize: tokenizeReferenceCollapsed
};

/** @type {Resolver} */
function resolveAllLabelEnd(events) {
  let index = -1;
  /** @type {Array<Event>} */
  const newEvents = [];
  while (++index < events.length) {
    const token = events[index][1];
    newEvents.push(events[index]);
    if (token.type === "labelImage" || token.type === "labelLink" || token.type === "labelEnd") {
      // Remove the marker.
      const offset = token.type === "labelImage" ? 4 : 2;
      token.type = "data";
      index += offset;
    }
  }

  // If the events are equal, we don't have to copy newEvents to events
  if (events.length !== newEvents.length) {
    splice(events, 0, events.length, newEvents);
  }
  return events;
}

/** @type {Resolver} */
function resolveToLabelEnd(events, context) {
  let index = events.length;
  let offset = 0;
  /** @type {Token} */
  let token;
  /** @type {number | undefined} */
  let open;
  /** @type {number | undefined} */
  let close;
  /** @type {Array<Event>} */
  let media;

  // Find an opening.
  while (index--) {
    token = events[index][1];
    if (open) {
      // If we see another link, or inactive link label, we’ve been here before.
      if (token.type === "link" || token.type === "labelLink" && token._inactive) {
        break;
      }

      // Mark other link openings as inactive, as we can’t have links in
      // links.
      if (events[index][0] === 'enter' && token.type === "labelLink") {
        token._inactive = true;
      }
    } else if (close) {
      if (events[index][0] === 'enter' && (token.type === "labelImage" || token.type === "labelLink") && !token._balanced) {
        open = index;
        if (token.type !== "labelLink") {
          offset = 2;
          break;
        }
      }
    } else if (token.type === "labelEnd") {
      close = index;
    }
  }
  const group = {
    type: events[open][1].type === "labelLink" ? "link" : "image",
    start: {
      ...events[open][1].start
    },
    end: {
      ...events[events.length - 1][1].end
    }
  };
  const label = {
    type: "label",
    start: {
      ...events[open][1].start
    },
    end: {
      ...events[close][1].end
    }
  };
  const text = {
    type: "labelText",
    start: {
      ...events[open + offset + 2][1].end
    },
    end: {
      ...events[close - 2][1].start
    }
  };
  media = [['enter', group, context], ['enter', label, context]];

  // Opening marker.
  media = push(media, events.slice(open + 1, open + offset + 3));

  // Text open.
  media = push(media, [['enter', text, context]]);

  // Always populated by defaults.

  // Between.
  media = push(media, resolveAll(context.parser.constructs.insideSpan.null, events.slice(open + offset + 4, close - 3), context));

  // Text close, marker close, label close.
  media = push(media, [['exit', text, context], events[close - 2], events[close - 1], ['exit', label, context]]);

  // Reference, resource, or so.
  media = push(media, events.slice(close + 1));

  // Media close.
  media = push(media, [['exit', group, context]]);
  splice(events, open, events.length, media);
  return events;
}

/**
 * @this {TokenizeContext}
 *   Context.
 * @type {Tokenizer}
 */
function tokenizeLabelEnd(effects, ok, nok) {
  const self = this;
  let index = self.events.length;
  /** @type {Token} */
  let labelStart;
  /** @type {boolean} */
  let defined;

  // Find an opening.
  while (index--) {
    if ((self.events[index][1].type === "labelImage" || self.events[index][1].type === "labelLink") && !self.events[index][1]._balanced) {
      labelStart = self.events[index][1];
      break;
    }
  }
  return start;

  /**
   * Start of label end.
   *
   * ```markdown
   * > | [a](b) c
   *       ^
   * > | [a][b] c
   *       ^
   * > | [a][] b
   *       ^
   * > | [a] b
   * ```
   *
   * @type {State}
   */
  function start(code) {
    // If there is not an okay opening.
    if (!labelStart) {
      return nok(code);
    }

    // If the corresponding label (link) start is marked as inactive,
    // it means we’d be wrapping a link, like this:
    //
    // ```markdown
    // > | a [b [c](d) e](f) g.
    //                  ^
    // ```
    //
    // We can’t have that, so it’s just balanced brackets.
    if (labelStart._inactive) {
      return labelEndNok(code);
    }
    defined = self.parser.defined.includes(normalizeIdentifier(self.sliceSerialize({
      start: labelStart.end,
      end: self.now()
    })));
    effects.enter("labelEnd");
    effects.enter("labelMarker");
    effects.consume(code);
    effects.exit("labelMarker");
    effects.exit("labelEnd");
    return after;
  }

  /**
   * After `]`.
   *
   * ```markdown
   * > | [a](b) c
   *       ^
   * > | [a][b] c
   *       ^
   * > | [a][] b
   *       ^
   * > | [a] b
   *       ^
   * ```
   *
   * @type {State}
   */
  function after(code) {
    // Note: `markdown-rs` also parses GFM footnotes here, which for us is in
    // an extension.

    // Resource (`[asd](fgh)`)?
    if (code === 40) {
      return effects.attempt(resourceConstruct, labelEndOk, defined ? labelEndOk : labelEndNok)(code);
    }

    // Full (`[asd][fgh]`) or collapsed (`[asd][]`) reference?
    if (code === 91) {
      return effects.attempt(referenceFullConstruct, labelEndOk, defined ? referenceNotFull : labelEndNok)(code);
    }

    // Shortcut (`[asd]`) reference?
    return defined ? labelEndOk(code) : labelEndNok(code);
  }

  /**
   * After `]`, at `[`, but not at a full reference.
   *
   * > 👉 **Note**: we only get here if the label is defined.
   *
   * ```markdown
   * > | [a][] b
   *        ^
   * > | [a] b
   *        ^
   * ```
   *
   * @type {State}
   */
  function referenceNotFull(code) {
    return effects.attempt(referenceCollapsedConstruct, labelEndOk, labelEndNok)(code);
  }

  /**
   * Done, we found something.
   *
   * ```markdown
   * > | [a](b) c
   *           ^
   * > | [a][b] c
   *           ^
   * > | [a][] b
   *          ^
   * > | [a] b
   *        ^
   * ```
   *
   * @type {State}
   */
  function labelEndOk(code) {
    // Note: `markdown-rs` does a bunch of stuff here.
    return ok(code);
  }

  /**
   * Done, it’s nothing.
   *
   * There was an okay opening, but we didn’t match anything.
   *
   * ```markdown
   * > | [a](b c
   *        ^
   * > | [a][b c
   *        ^
   * > | [a] b
   *        ^
   * ```
   *
   * @type {State}
   */
  function labelEndNok(code) {
    labelStart._balanced = true;
    return nok(code);
  }
}

/**
 * @this {TokenizeContext}
 *   Context.
 * @type {Tokenizer}
 */
function tokenizeResource(effects, ok, nok) {
  return resourceStart;

  /**
   * At a resource.
   *
   * ```markdown
   * > | [a](b) c
   *        ^
   * ```
   *
   * @type {State}
   */
  function resourceStart(code) {
    effects.enter("resource");
    effects.enter("resourceMarker");
    effects.consume(code);
    effects.exit("resourceMarker");
    return resourceBefore;
  }

  /**
   * In resource, after `(`, at optional whitespace.
   *
   * ```markdown
   * > | [a](b) c
   *         ^
   * ```
   *
   * @type {State}
   */
  function resourceBefore(code) {
    return markdownLineEndingOrSpace(code) ? factoryWhitespace(effects, resourceOpen)(code) : resourceOpen(code);
  }

  /**
   * In resource, after optional whitespace, at `)` or a destination.
   *
   * ```markdown
   * > | [a](b) c
   *         ^
   * ```
   *
   * @type {State}
   */
  function resourceOpen(code) {
    if (code === 41) {
      return resourceEnd(code);
    }
    return factoryDestination(effects, resourceDestinationAfter, resourceDestinationMissing, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(code);
  }

  /**
   * In resource, after destination, at optional whitespace.
   *
   * ```markdown
   * > | [a](b) c
   *          ^
   * ```
   *
   * @type {State}
   */
  function resourceDestinationAfter(code) {
    return markdownLineEndingOrSpace(code) ? factoryWhitespace(effects, resourceBetween)(code) : resourceEnd(code);
  }

  /**
   * At invalid destination.
   *
   * ```markdown
   * > | [a](<<) b
   *         ^
   * ```
   *
   * @type {State}
   */
  function resourceDestinationMissing(code) {
    return nok(code);
  }

  /**
   * In resource, after destination and whitespace, at `(` or title.
   *
   * ```markdown
   * > | [a](b ) c
   *           ^
   * ```
   *
   * @type {State}
   */
  function resourceBetween(code) {
    if (code === 34 || code === 39 || code === 40) {
      return factoryTitle(effects, resourceTitleAfter, nok, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(code);
    }
    return resourceEnd(code);
  }

  /**
   * In resource, after title, at optional whitespace.
   *
   * ```markdown
   * > | [a](b "c") d
   *              ^
   * ```
   *
   * @type {State}
   */
  function resourceTitleAfter(code) {
    return markdownLineEndingOrSpace(code) ? factoryWhitespace(effects, resourceEnd)(code) : resourceEnd(code);
  }

  /**
   * In resource, at `)`.
   *
   * ```markdown
   * > | [a](b) d
   *          ^
   * ```
   *
   * @type {State}
   */
  function resourceEnd(code) {
    if (code === 41) {
      effects.enter("resourceMarker");
      effects.consume(code);
      effects.exit("resourceMarker");
      effects.exit("resource");
      return ok;
    }
    return nok(code);
  }
}

/**
 * @this {TokenizeContext}
 *   Context.
 * @type {Tokenizer}
 */
function tokenizeReferenceFull(effects, ok, nok) {
  const self = this;
  return referenceFull;

  /**
   * In a reference (full), at the `[`.
   *
   * ```markdown
   * > | [a][b] d
   *        ^
   * ```
   *
   * @type {State}
   */
  function referenceFull(code) {
    return factoryLabel.call(self, effects, referenceFullAfter, referenceFullMissing, "reference", "referenceMarker", "referenceString")(code);
  }

  /**
   * In a reference (full), after `]`.
   *
   * ```markdown
   * > | [a][b] d
   *          ^
   * ```
   *
   * @type {State}
   */
  function referenceFullAfter(code) {
    return self.parser.defined.includes(normalizeIdentifier(self.sliceSerialize(self.events[self.events.length - 1][1]).slice(1, -1))) ? ok(code) : nok(code);
  }

  /**
   * In reference (full) that was missing.
   *
   * ```markdown
   * > | [a][b d
   *        ^
   * ```
   *
   * @type {State}
   */
  function referenceFullMissing(code) {
    return nok(code);
  }
}

/**
 * @this {TokenizeContext}
 *   Context.
 * @type {Tokenizer}
 */
function tokenizeReferenceCollapsed(effects, ok, nok) {
  return referenceCollapsedStart;

  /**
   * In reference (collapsed), at `[`.
   *
   * > 👉 **Note**: we only get here if the label is defined.
   *
   * ```markdown
   * > | [a][] d
   *        ^
   * ```
   *
   * @type {State}
   */
  function referenceCollapsedStart(code) {
    // We only attempt a collapsed label if there’s a `[`.

    effects.enter("reference");
    effects.enter("referenceMarker");
    effects.consume(code);
    effects.exit("referenceMarker");
    return referenceCollapsedOpen;
  }

  /**
   * In reference (collapsed), at `]`.
   *
   * > 👉 **Note**: we only get here if the label is defined.
   *
   * ```markdown
   * > | [a][] d
   *         ^
   * ```
   *
   *  @type {State}
   */
  function referenceCollapsedOpen(code) {
    if (code === 93) {
      effects.enter("referenceMarker");
      effects.consume(code);
      effects.exit("referenceMarker");
      effects.exit("reference");
      return ok;
    }
    return nok(code);
  }
}

/**
 * @import {
 *   Construct,
 *   State,
 *   TokenizeContext,
 *   Tokenizer
 * } from 'micromark-util-types'
 */


/** @type {Construct} */
const labelStartImage = {
  name: 'labelStartImage',
  resolveAll: labelEnd.resolveAll,
  tokenize: tokenizeLabelStartImage
};

/**
 * @this {TokenizeContext}
 *   Context.
 * @type {Tokenizer}
 */
function tokenizeLabelStartImage(effects, ok, nok) {
  const self = this;
  return start;

  /**
   * Start of label (image) start.
   *
   * ```markdown
   * > | a ![b] c
   *       ^
   * ```
   *
   * @type {State}
   */
  function start(code) {
    effects.enter("labelImage");
    effects.enter("labelImageMarker");
    effects.consume(code);
    effects.exit("labelImageMarker");
    return open;
  }

  /**
   * After `!`, at `[`.
   *
   * ```markdown
   * > | a ![b] c
   *        ^
   * ```
   *
   * @type {State}
   */
  function open(code) {
    if (code === 91) {
      effects.enter("labelMarker");
      effects.consume(code);
      effects.exit("labelMarker");
      effects.exit("labelImage");
      return after;
    }
    return nok(code);
  }

  /**
   * After `![`.
   *
   * ```markdown
   * > | a ![b] c
   *         ^
   * ```
   *
   * This is needed in because, when GFM footnotes are enabled, images never
   * form when started with a `^`.
   * Instead, links form:
   *
   * ```markdown
   * ![^a](b)
   *
   * ![^a][b]
   *
   * [b]: c
   * ```
   *
   * ```html
   * <p>!<a href=\"b\">^a</a></p>
   * <p>!<a href=\"c\">^a</a></p>
   * ```
   *
   * @type {State}
   */
  function after(code) {
    // To do: use a new field to do this, this is still needed for
    // `micromark-extension-gfm-footnote`, but the `label-start-link`
    // behavior isn’t.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    return code === 94 && '_hiddenFootnoteSupport' in self.parser.constructs ? nok(code) : ok(code);
  }
}

/**
 * @import {
 *   Construct,
 *   State,
 *   TokenizeContext,
 *   Tokenizer
 * } from 'micromark-util-types'
 */


/** @type {Construct} */
const labelStartLink = {
  name: 'labelStartLink',
  resolveAll: labelEnd.resolveAll,
  tokenize: tokenizeLabelStartLink
};

/**
 * @this {TokenizeContext}
 *   Context.
 * @type {Tokenizer}
 */
function tokenizeLabelStartLink(effects, ok, nok) {
  const self = this;
  return start;

  /**
   * Start of label (link) start.
   *
   * ```markdown
   * > | a [b] c
   *       ^
   * ```
   *
   * @type {State}
   */
  function start(code) {
    effects.enter("labelLink");
    effects.enter("labelMarker");
    effects.consume(code);
    effects.exit("labelMarker");
    effects.exit("labelLink");
    return after;
  }

  /** @type {State} */
  function after(code) {
    // To do: this isn’t needed in `micromark-extension-gfm-footnote`,
    // remove.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    return code === 94 && '_hiddenFootnoteSupport' in self.parser.constructs ? nok(code) : ok(code);
  }
}

/**
 * @import {
 *   Construct,
 *   State,
 *   TokenizeContext,
 *   Tokenizer
 * } from 'micromark-util-types'
 */

/** @type {Construct} */
const lineEnding = {
  name: 'lineEnding',
  tokenize: tokenizeLineEnding
};

/**
 * @this {TokenizeContext}
 *   Context.
 * @type {Tokenizer}
 */
function tokenizeLineEnding(effects, ok) {
  return start;

  /** @type {State} */
  function start(code) {
    effects.enter("lineEnding");
    effects.consume(code);
    effects.exit("lineEnding");
    return factorySpace(effects, ok, "linePrefix");
  }
}

/**
 * @import {
 *   Code,
 *   Construct,
 *   State,
 *   TokenizeContext,
 *   Tokenizer
 * } from 'micromark-util-types'
 */

/** @type {Construct} */
const thematicBreak = {
  name: 'thematicBreak',
  tokenize: tokenizeThematicBreak
};

/**
 * @this {TokenizeContext}
 *   Context.
 * @type {Tokenizer}
 */
function tokenizeThematicBreak(effects, ok, nok) {
  let size = 0;
  /** @type {NonNullable<Code>} */
  let marker;
  return start;

  /**
   * Start of thematic break.
   *
   * ```markdown
   * > | ***
   *     ^
   * ```
   *
   * @type {State}
   */
  function start(code) {
    effects.enter("thematicBreak");
    // To do: parse indent like `markdown-rs`.
    return before(code);
  }

  /**
   * After optional whitespace, at marker.
   *
   * ```markdown
   * > | ***
   *     ^
   * ```
   *
   * @type {State}
   */
  function before(code) {
    marker = code;
    return atBreak(code);
  }

  /**
   * After something, before something else.
   *
   * ```markdown
   * > | ***
   *     ^
   * ```
   *
   * @type {State}
   */
  function atBreak(code) {
    if (code === marker) {
      effects.enter("thematicBreakSequence");
      return sequence(code);
    }
    if (size >= 3 && (code === null || markdownLineEnding(code))) {
      effects.exit("thematicBreak");
      return ok(code);
    }
    return nok(code);
  }

  /**
   * In sequence.
   *
   * ```markdown
   * > | ***
   *     ^
   * ```
   *
   * @type {State}
   */
  function sequence(code) {
    if (code === marker) {
      effects.consume(code);
      size++;
      return sequence;
    }
    effects.exit("thematicBreakSequence");
    return markdownSpace(code) ? factorySpace(effects, atBreak, "whitespace")(code) : atBreak(code);
  }
}

/**
 * @import {
 *   Code,
 *   Construct,
 *   Exiter,
 *   State,
 *   TokenizeContext,
 *   Tokenizer
 * } from 'micromark-util-types'
 */


/** @type {Construct} */
const list = {
  continuation: {
    tokenize: tokenizeListContinuation
  },
  exit: tokenizeListEnd,
  name: 'list',
  tokenize: tokenizeListStart
};

/** @type {Construct} */
const listItemPrefixWhitespaceConstruct = {
  partial: true,
  tokenize: tokenizeListItemPrefixWhitespace
};

/** @type {Construct} */
const indentConstruct = {
  partial: true,
  tokenize: tokenizeIndent
};

// To do: `markdown-rs` parses list items on their own and later stitches them
// together.

/**
 * @this {TokenizeContext}
 *   Context.
 * @type {Tokenizer}
 */
function tokenizeListStart(effects, ok, nok) {
  const self = this;
  const tail = self.events[self.events.length - 1];
  let initialSize = tail && tail[1].type === "linePrefix" ? tail[2].sliceSerialize(tail[1], true).length : 0;
  let size = 0;
  return start;

  /** @type {State} */
  function start(code) {
    const kind = self.containerState.type || (code === 42 || code === 43 || code === 45 ? "listUnordered" : "listOrdered");
    if (kind === "listUnordered" ? !self.containerState.marker || code === self.containerState.marker : asciiDigit(code)) {
      if (!self.containerState.type) {
        self.containerState.type = kind;
        effects.enter(kind, {
          _container: true
        });
      }
      if (kind === "listUnordered") {
        effects.enter("listItemPrefix");
        return code === 42 || code === 45 ? effects.check(thematicBreak, nok, atMarker)(code) : atMarker(code);
      }
      if (!self.interrupt || code === 49) {
        effects.enter("listItemPrefix");
        effects.enter("listItemValue");
        return inside(code);
      }
    }
    return nok(code);
  }

  /** @type {State} */
  function inside(code) {
    if (asciiDigit(code) && ++size < 10) {
      effects.consume(code);
      return inside;
    }
    if ((!self.interrupt || size < 2) && (self.containerState.marker ? code === self.containerState.marker : code === 41 || code === 46)) {
      effects.exit("listItemValue");
      return atMarker(code);
    }
    return nok(code);
  }

  /**
   * @type {State}
   **/
  function atMarker(code) {
    effects.enter("listItemMarker");
    effects.consume(code);
    effects.exit("listItemMarker");
    self.containerState.marker = self.containerState.marker || code;
    return effects.check(blankLine,
    // Can’t be empty when interrupting.
    self.interrupt ? nok : onBlank, effects.attempt(listItemPrefixWhitespaceConstruct, endOfPrefix, otherPrefix));
  }

  /** @type {State} */
  function onBlank(code) {
    self.containerState.initialBlankLine = true;
    initialSize++;
    return endOfPrefix(code);
  }

  /** @type {State} */
  function otherPrefix(code) {
    if (markdownSpace(code)) {
      effects.enter("listItemPrefixWhitespace");
      effects.consume(code);
      effects.exit("listItemPrefixWhitespace");
      return endOfPrefix;
    }
    return nok(code);
  }

  /** @type {State} */
  function endOfPrefix(code) {
    self.containerState.size = initialSize + self.sliceSerialize(effects.exit("listItemPrefix"), true).length;
    return ok(code);
  }
}

/**
 * @this {TokenizeContext}
 *   Context.
 * @type {Tokenizer}
 */
function tokenizeListContinuation(effects, ok, nok) {
  const self = this;
  self.containerState._closeFlow = undefined;
  return effects.check(blankLine, onBlank, notBlank);

  /** @type {State} */
  function onBlank(code) {
    self.containerState.furtherBlankLines = self.containerState.furtherBlankLines || self.containerState.initialBlankLine;

    // We have a blank line.
    // Still, try to consume at most the items size.
    return factorySpace(effects, ok, "listItemIndent", self.containerState.size + 1)(code);
  }

  /** @type {State} */
  function notBlank(code) {
    if (self.containerState.furtherBlankLines || !markdownSpace(code)) {
      self.containerState.furtherBlankLines = undefined;
      self.containerState.initialBlankLine = undefined;
      return notInCurrentItem(code);
    }
    self.containerState.furtherBlankLines = undefined;
    self.containerState.initialBlankLine = undefined;
    return effects.attempt(indentConstruct, ok, notInCurrentItem)(code);
  }

  /** @type {State} */
  function notInCurrentItem(code) {
    // While we do continue, we signal that the flow should be closed.
    self.containerState._closeFlow = true;
    // As we’re closing flow, we’re no longer interrupting.
    self.interrupt = undefined;
    // Always populated by defaults.

    return factorySpace(effects, effects.attempt(list, ok, nok), "linePrefix", self.parser.constructs.disable.null.includes('codeIndented') ? undefined : 4)(code);
  }
}

/**
 * @this {TokenizeContext}
 *   Context.
 * @type {Tokenizer}
 */
function tokenizeIndent(effects, ok, nok) {
  const self = this;
  return factorySpace(effects, afterPrefix, "listItemIndent", self.containerState.size + 1);

  /** @type {State} */
  function afterPrefix(code) {
    const tail = self.events[self.events.length - 1];
    return tail && tail[1].type === "listItemIndent" && tail[2].sliceSerialize(tail[1], true).length === self.containerState.size ? ok(code) : nok(code);
  }
}

/**
 * @this {TokenizeContext}
 *   Context.
 * @type {Exiter}
 */
function tokenizeListEnd(effects) {
  effects.exit(this.containerState.type);
}

/**
 * @this {TokenizeContext}
 *   Context.
 * @type {Tokenizer}
 */
function tokenizeListItemPrefixWhitespace(effects, ok, nok) {
  const self = this;

  // Always populated by defaults.

  return factorySpace(effects, afterPrefix, "listItemPrefixWhitespace", self.parser.constructs.disable.null.includes('codeIndented') ? undefined : 4 + 1);

  /** @type {State} */
  function afterPrefix(code) {
    const tail = self.events[self.events.length - 1];
    return !markdownSpace(code) && tail && tail[1].type === "listItemPrefixWhitespace" ? ok(code) : nok(code);
  }
}

/**
 * @import {
 *   Code,
 *   Construct,
 *   Resolver,
 *   State,
 *   TokenizeContext,
 *   Tokenizer
 * } from 'micromark-util-types'
 */

/** @type {Construct} */
const setextUnderline = {
  name: 'setextUnderline',
  resolveTo: resolveToSetextUnderline,
  tokenize: tokenizeSetextUnderline
};

/** @type {Resolver} */
function resolveToSetextUnderline(events, context) {
  // To do: resolve like `markdown-rs`.
  let index = events.length;
  /** @type {number | undefined} */
  let content;
  /** @type {number | undefined} */
  let text;
  /** @type {number | undefined} */
  let definition;

  // Find the opening of the content.
  // It’ll always exist: we don’t tokenize if it isn’t there.
  while (index--) {
    if (events[index][0] === 'enter') {
      if (events[index][1].type === "content") {
        content = index;
        break;
      }
      if (events[index][1].type === "paragraph") {
        text = index;
      }
    }
    // Exit
    else {
      if (events[index][1].type === "content") {
        // Remove the content end (if needed we’ll add it later)
        events.splice(index, 1);
      }
      if (!definition && events[index][1].type === "definition") {
        definition = index;
      }
    }
  }
  const heading = {
    type: "setextHeading",
    start: {
      ...events[content][1].start
    },
    end: {
      ...events[events.length - 1][1].end
    }
  };

  // Change the paragraph to setext heading text.
  events[text][1].type = "setextHeadingText";

  // If we have definitions in the content, we’ll keep on having content,
  // but we need move it.
  if (definition) {
    events.splice(text, 0, ['enter', heading, context]);
    events.splice(definition + 1, 0, ['exit', events[content][1], context]);
    events[content][1].end = {
      ...events[definition][1].end
    };
  } else {
    events[content][1] = heading;
  }

  // Add the heading exit at the end.
  events.push(['exit', heading, context]);
  return events;
}

/**
 * @this {TokenizeContext}
 *   Context.
 * @type {Tokenizer}
 */
function tokenizeSetextUnderline(effects, ok, nok) {
  const self = this;
  /** @type {NonNullable<Code>} */
  let marker;
  return start;

  /**
   * At start of heading (setext) underline.
   *
   * ```markdown
   *   | aa
   * > | ==
   *     ^
   * ```
   *
   * @type {State}
   */
  function start(code) {
    let index = self.events.length;
    /** @type {boolean | undefined} */
    let paragraph;
    // Find an opening.
    while (index--) {
      // Skip enter/exit of line ending, line prefix, and content.
      // We can now either have a definition or a paragraph.
      if (self.events[index][1].type !== "lineEnding" && self.events[index][1].type !== "linePrefix" && self.events[index][1].type !== "content") {
        paragraph = self.events[index][1].type === "paragraph";
        break;
      }
    }

    // To do: handle lazy/pierce like `markdown-rs`.
    // To do: parse indent like `markdown-rs`.
    if (!self.parser.lazy[self.now().line] && (self.interrupt || paragraph)) {
      effects.enter("setextHeadingLine");
      marker = code;
      return before(code);
    }
    return nok(code);
  }

  /**
   * After optional whitespace, at `-` or `=`.
   *
   * ```markdown
   *   | aa
   * > | ==
   *     ^
   * ```
   *
   * @type {State}
   */
  function before(code) {
    effects.enter("setextHeadingLineSequence");
    return inside(code);
  }

  /**
   * In sequence.
   *
   * ```markdown
   *   | aa
   * > | ==
   *     ^
   * ```
   *
   * @type {State}
   */
  function inside(code) {
    if (code === marker) {
      effects.consume(code);
      return inside;
    }
    effects.exit("setextHeadingLineSequence");
    return markdownSpace(code) ? factorySpace(effects, after, "lineSuffix")(code) : after(code);
  }

  /**
   * After sequence, after optional whitespace.
   *
   * ```markdown
   *   | aa
   * > | ==
   *       ^
   * ```
   *
   * @type {State}
   */
  function after(code) {
    if (code === null || markdownLineEnding(code)) {
      effects.exit("setextHeadingLine");
      return ok(code);
    }
    return nok(code);
  }
}

/**
 * @import {
 *   InitialConstruct,
 *   Initializer,
 *   State,
 *   TokenizeContext
 * } from 'micromark-util-types'
 */

/** @type {InitialConstruct} */
const flow$1 = {
  tokenize: initializeFlow
};

/**
 * @this {TokenizeContext}
 *   Self.
 * @type {Initializer}
 *   Initializer.
 */
function initializeFlow(effects) {
  const self = this;
  const initial = effects.attempt(
  // Try to parse a blank line.
  blankLine, atBlankEnding,
  // Try to parse initial flow (essentially, only code).
  effects.attempt(this.parser.constructs.flowInitial, afterConstruct, factorySpace(effects, effects.attempt(this.parser.constructs.flow, afterConstruct, effects.attempt(content, afterConstruct)), "linePrefix")));
  return initial;

  /** @type {State} */
  function atBlankEnding(code) {
    if (code === null) {
      effects.consume(code);
      return;
    }
    effects.enter("lineEndingBlank");
    effects.consume(code);
    effects.exit("lineEndingBlank");
    self.currentConstruct = undefined;
    return initial;
  }

  /** @type {State} */
  function afterConstruct(code) {
    if (code === null) {
      effects.consume(code);
      return;
    }
    effects.enter("lineEnding");
    effects.consume(code);
    effects.exit("lineEnding");
    self.currentConstruct = undefined;
    return initial;
  }
}

/**
 * @import {
 *   Code,
 *   InitialConstruct,
 *   Initializer,
 *   Resolver,
 *   State,
 *   TokenizeContext
 * } from 'micromark-util-types'
 */

const resolver = {
  resolveAll: createResolver()
};
const string$1 = initializeFactory('string');
const text$1 = initializeFactory('text');

/**
 * @param {'string' | 'text'} field
 *   Field.
 * @returns {InitialConstruct}
 *   Construct.
 */
function initializeFactory(field) {
  return {
    resolveAll: createResolver(field === 'text' ? resolveAllLineSuffixes : undefined),
    tokenize: initializeText
  };

  /**
   * @this {TokenizeContext}
   *   Context.
   * @type {Initializer}
   */
  function initializeText(effects) {
    const self = this;
    const constructs = this.parser.constructs[field];
    const text = effects.attempt(constructs, start, notText);
    return start;

    /** @type {State} */
    function start(code) {
      return atBreak(code) ? text(code) : notText(code);
    }

    /** @type {State} */
    function notText(code) {
      if (code === null) {
        effects.consume(code);
        return;
      }
      effects.enter("data");
      effects.consume(code);
      return data;
    }

    /** @type {State} */
    function data(code) {
      if (atBreak(code)) {
        effects.exit("data");
        return text(code);
      }

      // Data.
      effects.consume(code);
      return data;
    }

    /**
     * @param {Code} code
     *   Code.
     * @returns {boolean}
     *   Whether the code is a break.
     */
    function atBreak(code) {
      if (code === null) {
        return true;
      }
      const list = constructs[code];
      let index = -1;
      if (list) {
        // Always populated by defaults.

        while (++index < list.length) {
          const item = list[index];
          if (!item.previous || item.previous.call(self, self.previous)) {
            return true;
          }
        }
      }
      return false;
    }
  }
}

/**
 * @param {Resolver | undefined} [extraResolver]
 *   Resolver.
 * @returns {Resolver}
 *   Resolver.
 */
function createResolver(extraResolver) {
  return resolveAllText;

  /** @type {Resolver} */
  function resolveAllText(events, context) {
    let index = -1;
    /** @type {number | undefined} */
    let enter;

    // A rather boring computation (to merge adjacent `data` events) which
    // improves mm performance by 29%.
    while (++index <= events.length) {
      if (enter === undefined) {
        if (events[index] && events[index][1].type === "data") {
          enter = index;
          index++;
        }
      } else if (!events[index] || events[index][1].type !== "data") {
        // Don’t do anything if there is one data token.
        if (index !== enter + 2) {
          events[enter][1].end = events[index - 1][1].end;
          events.splice(enter + 2, index - enter - 2);
          index = enter + 2;
        }
        enter = undefined;
      }
    }
    return extraResolver ? extraResolver(events, context) : events;
  }
}

/**
 * A rather ugly set of instructions which again looks at chunks in the input
 * stream.
 * The reason to do this here is that it is *much* faster to parse in reverse.
 * And that we can’t hook into `null` to split the line suffix before an EOF.
 * To do: figure out if we can make this into a clean utility, or even in core.
 * As it will be useful for GFMs literal autolink extension (and maybe even
 * tables?)
 *
 * @type {Resolver}
 */
function resolveAllLineSuffixes(events, context) {
  let eventIndex = 0; // Skip first.

  while (++eventIndex <= events.length) {
    if ((eventIndex === events.length || events[eventIndex][1].type === "lineEnding") && events[eventIndex - 1][1].type === "data") {
      const data = events[eventIndex - 1][1];
      const chunks = context.sliceStream(data);
      let index = chunks.length;
      let bufferIndex = -1;
      let size = 0;
      /** @type {boolean | undefined} */
      let tabs;
      while (index--) {
        const chunk = chunks[index];
        if (typeof chunk === 'string') {
          bufferIndex = chunk.length;
          while (chunk.charCodeAt(bufferIndex - 1) === 32) {
            size++;
            bufferIndex--;
          }
          if (bufferIndex) break;
          bufferIndex = -1;
        }
        // Number
        else if (chunk === -2) {
          tabs = true;
          size++;
        } else if (chunk === -1) ; else {
          // Replacement character, exit.
          index++;
          break;
        }
      }

      // Allow final trailing whitespace.
      if (context._contentTypeTextTrailing && eventIndex === events.length) {
        size = 0;
      }
      if (size) {
        const token = {
          type: eventIndex === events.length || tabs || size < 2 ? "lineSuffix" : "hardBreakTrailing",
          start: {
            _bufferIndex: index ? bufferIndex : data.start._bufferIndex + bufferIndex,
            _index: data.start._index + index,
            line: data.end.line,
            column: data.end.column - size,
            offset: data.end.offset - size
          },
          end: {
            ...data.end
          }
        };
        data.end = {
          ...token.start
        };
        if (data.start.offset === data.end.offset) {
          Object.assign(data, token);
        } else {
          events.splice(eventIndex, 0, ['enter', token, context], ['exit', token, context]);
          eventIndex += 2;
        }
      }
      eventIndex++;
    }
  }
  return events;
}

/**
 * @import {Extension} from 'micromark-util-types'
 */


/** @satisfies {Extension['document']} */
const document = {
  [42]: list,
  [43]: list,
  [45]: list,
  [48]: list,
  [49]: list,
  [50]: list,
  [51]: list,
  [52]: list,
  [53]: list,
  [54]: list,
  [55]: list,
  [56]: list,
  [57]: list,
  [62]: blockQuote
};

/** @satisfies {Extension['contentInitial']} */
const contentInitial = {
  [91]: definition
};

/** @satisfies {Extension['flowInitial']} */
const flowInitial = {
  [-2]: codeIndented,
  [-1]: codeIndented,
  [32]: codeIndented
};

/** @satisfies {Extension['flow']} */
const flow = {
  [35]: headingAtx,
  [42]: thematicBreak,
  [45]: [setextUnderline, thematicBreak],
  [60]: htmlFlow,
  [61]: setextUnderline,
  [95]: thematicBreak,
  [96]: codeFenced,
  [126]: codeFenced
};

/** @satisfies {Extension['string']} */
const string = {
  [38]: characterReference,
  [92]: characterEscape
};

/** @satisfies {Extension['text']} */
const text = {
  [-5]: lineEnding,
  [-4]: lineEnding,
  [-3]: lineEnding,
  [33]: labelStartImage,
  [38]: characterReference,
  [42]: attention,
  [60]: [autolink, htmlText],
  [91]: labelStartLink,
  [92]: [hardBreakEscape, characterEscape],
  [93]: labelEnd,
  [95]: attention,
  [96]: codeText
};

/** @satisfies {Extension['insideSpan']} */
const insideSpan = {
  null: [attention, resolver]
};

/** @satisfies {Extension['attentionMarkers']} */
const attentionMarkers = {
  null: [42, 95]
};

/** @satisfies {Extension['disable']} */
const disable = {
  null: []
};

const defaultConstructs = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  attentionMarkers,
  contentInitial,
  disable,
  document,
  flow,
  flowInitial,
  insideSpan,
  string,
  text
}, Symbol.toStringTag, { value: 'Module' }));

/**
 * @import {
 *   Chunk,
 *   Code,
 *   ConstructRecord,
 *   Construct,
 *   Effects,
 *   InitialConstruct,
 *   ParseContext,
 *   Point,
 *   State,
 *   TokenizeContext,
 *   Token
 * } from 'micromark-util-types'
 */

/**
 * Create a tokenizer.
 * Tokenizers deal with one type of data (e.g., containers, flow, text).
 * The parser is the object dealing with it all.
 * `initialize` works like other constructs, except that only its `tokenize`
 * function is used, in which case it doesn’t receive an `ok` or `nok`.
 * `from` can be given to set the point before the first character, although
 * when further lines are indented, they must be set with `defineSkip`.
 *
 * @param {ParseContext} parser
 *   Parser.
 * @param {InitialConstruct} initialize
 *   Construct.
 * @param {Omit<Point, '_bufferIndex' | '_index'> | undefined} [from]
 *   Point (optional).
 * @returns {TokenizeContext}
 *   Context.
 */
function createTokenizer(parser, initialize, from) {
  /** @type {Point} */
  let point = {
    _bufferIndex: -1,
    _index: 0,
    line: from && from.line || 1,
    column: from && from.column || 1,
    offset: from && from.offset || 0
  };
  /** @type {Record<string, number>} */
  const columnStart = {};
  /** @type {Array<Construct>} */
  const resolveAllConstructs = [];
  /** @type {Array<Chunk>} */
  let chunks = [];
  /** @type {Array<Token>} */
  let stack = [];

  /**
   * Tools used for tokenizing.
   *
   * @type {Effects}
   */
  const effects = {
    attempt: constructFactory(onsuccessfulconstruct),
    check: constructFactory(onsuccessfulcheck),
    consume,
    enter,
    exit,
    interrupt: constructFactory(onsuccessfulcheck, {
      interrupt: true
    })
  };

  /**
   * State and tools for resolving and serializing.
   *
   * @type {TokenizeContext}
   */
  const context = {
    code: null,
    containerState: {},
    defineSkip,
    events: [],
    now,
    parser,
    previous: null,
    sliceSerialize,
    sliceStream,
    write
  };

  /**
   * The state function.
   *
   * @type {State | undefined}
   */
  let state = initialize.tokenize.call(context, effects);
  if (initialize.resolveAll) {
    resolveAllConstructs.push(initialize);
  }
  return context;

  /** @type {TokenizeContext['write']} */
  function write(slice) {
    chunks = push(chunks, slice);
    main();

    // Exit if we’re not done, resolve might change stuff.
    if (chunks[chunks.length - 1] !== null) {
      return [];
    }
    addResult(initialize, 0);

    // Otherwise, resolve, and exit.
    context.events = resolveAll(resolveAllConstructs, context.events, context);
    return context.events;
  }

  //
  // Tools.
  //

  /** @type {TokenizeContext['sliceSerialize']} */
  function sliceSerialize(token, expandTabs) {
    return serializeChunks(sliceStream(token), expandTabs);
  }

  /** @type {TokenizeContext['sliceStream']} */
  function sliceStream(token) {
    return sliceChunks(chunks, token);
  }

  /** @type {TokenizeContext['now']} */
  function now() {
    // This is a hot path, so we clone manually instead of `Object.assign({}, point)`
    const {
      _bufferIndex,
      _index,
      line,
      column,
      offset
    } = point;
    return {
      _bufferIndex,
      _index,
      line,
      column,
      offset
    };
  }

  /** @type {TokenizeContext['defineSkip']} */
  function defineSkip(value) {
    columnStart[value.line] = value.column;
    accountForPotentialSkip();
  }

  //
  // State management.
  //

  /**
   * Main loop (note that `_index` and `_bufferIndex` in `point` are modified by
   * `consume`).
   * Here is where we walk through the chunks, which either include strings of
   * several characters, or numerical character codes.
   * The reason to do this in a loop instead of a call is so the stack can
   * drain.
   *
   * @returns {undefined}
   *   Nothing.
   */
  function main() {
    /** @type {number} */
    let chunkIndex;
    while (point._index < chunks.length) {
      const chunk = chunks[point._index];

      // If we’re in a buffer chunk, loop through it.
      if (typeof chunk === 'string') {
        chunkIndex = point._index;
        if (point._bufferIndex < 0) {
          point._bufferIndex = 0;
        }
        while (point._index === chunkIndex && point._bufferIndex < chunk.length) {
          go(chunk.charCodeAt(point._bufferIndex));
        }
      } else {
        go(chunk);
      }
    }
  }

  /**
   * Deal with one code.
   *
   * @param {Code} code
   *   Code.
   * @returns {undefined}
   *   Nothing.
   */
  function go(code) {
    state = state(code);
  }

  /** @type {Effects['consume']} */
  function consume(code) {
    if (markdownLineEnding(code)) {
      point.line++;
      point.column = 1;
      point.offset += code === -3 ? 2 : 1;
      accountForPotentialSkip();
    } else if (code !== -1) {
      point.column++;
      point.offset++;
    }

    // Not in a string chunk.
    if (point._bufferIndex < 0) {
      point._index++;
    } else {
      point._bufferIndex++;

      // At end of string chunk.
      if (point._bufferIndex ===
      // Points w/ non-negative `_bufferIndex` reference
      // strings.
      /** @type {string} */
      chunks[point._index].length) {
        point._bufferIndex = -1;
        point._index++;
      }
    }

    // Expose the previous character.
    context.previous = code;
  }

  /** @type {Effects['enter']} */
  function enter(type, fields) {
    /** @type {Token} */
    // @ts-expect-error Patch instead of assign required fields to help GC.
    const token = fields || {};
    token.type = type;
    token.start = now();
    context.events.push(['enter', token, context]);
    stack.push(token);
    return token;
  }

  /** @type {Effects['exit']} */
  function exit(type) {
    const token = stack.pop();
    token.end = now();
    context.events.push(['exit', token, context]);
    return token;
  }

  /**
   * Use results.
   *
   * @type {ReturnHandle}
   */
  function onsuccessfulconstruct(construct, info) {
    addResult(construct, info.from);
  }

  /**
   * Discard results.
   *
   * @type {ReturnHandle}
   */
  function onsuccessfulcheck(_, info) {
    info.restore();
  }

  /**
   * Factory to attempt/check/interrupt.
   *
   * @param {ReturnHandle} onreturn
   *   Callback.
   * @param {{interrupt?: boolean | undefined} | undefined} [fields]
   *   Fields.
   */
  function constructFactory(onreturn, fields) {
    return hook;

    /**
     * Handle either an object mapping codes to constructs, a list of
     * constructs, or a single construct.
     *
     * @param {Array<Construct> | ConstructRecord | Construct} constructs
     *   Constructs.
     * @param {State} returnState
     *   State.
     * @param {State | undefined} [bogusState]
     *   State.
     * @returns {State}
     *   State.
     */
    function hook(constructs, returnState, bogusState) {
      /** @type {ReadonlyArray<Construct>} */
      let listOfConstructs;
      /** @type {number} */
      let constructIndex;
      /** @type {Construct} */
      let currentConstruct;
      /** @type {Info} */
      let info;
      return Array.isArray(constructs) ? /* c8 ignore next 1 */
      handleListOfConstructs(constructs) : 'tokenize' in constructs ?
      // Looks like a construct.
      handleListOfConstructs([(/** @type {Construct} */constructs)]) : handleMapOfConstructs(constructs);

      /**
       * Handle a list of construct.
       *
       * @param {ConstructRecord} map
       *   Constructs.
       * @returns {State}
       *   State.
       */
      function handleMapOfConstructs(map) {
        return start;

        /** @type {State} */
        function start(code) {
          const left = code !== null && map[code];
          const all = code !== null && map.null;
          const list = [
          // To do: add more extension tests.
          /* c8 ignore next 2 */
          ...(Array.isArray(left) ? left : left ? [left] : []), ...(Array.isArray(all) ? all : all ? [all] : [])];
          return handleListOfConstructs(list)(code);
        }
      }

      /**
       * Handle a list of construct.
       *
       * @param {ReadonlyArray<Construct>} list
       *   Constructs.
       * @returns {State}
       *   State.
       */
      function handleListOfConstructs(list) {
        listOfConstructs = list;
        constructIndex = 0;
        if (list.length === 0) {
          return bogusState;
        }
        return handleConstruct(list[constructIndex]);
      }

      /**
       * Handle a single construct.
       *
       * @param {Construct} construct
       *   Construct.
       * @returns {State}
       *   State.
       */
      function handleConstruct(construct) {
        return start;

        /** @type {State} */
        function start(code) {
          // To do: not needed to store if there is no bogus state, probably?
          // Currently doesn’t work because `inspect` in document does a check
          // w/o a bogus, which doesn’t make sense. But it does seem to help perf
          // by not storing.
          info = store();
          currentConstruct = construct;
          if (!construct.partial) {
            context.currentConstruct = construct;
          }

          // Always populated by defaults.

          if (construct.name && context.parser.constructs.disable.null.includes(construct.name)) {
            return nok();
          }
          return construct.tokenize.call(
          // If we do have fields, create an object w/ `context` as its
          // prototype.
          // This allows a “live binding”, which is needed for `interrupt`.
          fields ? Object.assign(Object.create(context), fields) : context, effects, ok, nok)(code);
        }
      }

      /** @type {State} */
      function ok(code) {
        onreturn(currentConstruct, info);
        return returnState;
      }

      /** @type {State} */
      function nok(code) {
        info.restore();
        if (++constructIndex < listOfConstructs.length) {
          return handleConstruct(listOfConstructs[constructIndex]);
        }
        return bogusState;
      }
    }
  }

  /**
   * @param {Construct} construct
   *   Construct.
   * @param {number} from
   *   From.
   * @returns {undefined}
   *   Nothing.
   */
  function addResult(construct, from) {
    if (construct.resolveAll && !resolveAllConstructs.includes(construct)) {
      resolveAllConstructs.push(construct);
    }
    if (construct.resolve) {
      splice(context.events, from, context.events.length - from, construct.resolve(context.events.slice(from), context));
    }
    if (construct.resolveTo) {
      context.events = construct.resolveTo(context.events, context);
    }
  }

  /**
   * Store state.
   *
   * @returns {Info}
   *   Info.
   */
  function store() {
    const startPoint = now();
    const startPrevious = context.previous;
    const startCurrentConstruct = context.currentConstruct;
    const startEventsIndex = context.events.length;
    const startStack = Array.from(stack);
    return {
      from: startEventsIndex,
      restore
    };

    /**
     * Restore state.
     *
     * @returns {undefined}
     *   Nothing.
     */
    function restore() {
      point = startPoint;
      context.previous = startPrevious;
      context.currentConstruct = startCurrentConstruct;
      context.events.length = startEventsIndex;
      stack = startStack;
      accountForPotentialSkip();
    }
  }

  /**
   * Move the current point a bit forward in the line when it’s on a column
   * skip.
   *
   * @returns {undefined}
   *   Nothing.
   */
  function accountForPotentialSkip() {
    if (point.line in columnStart && point.column < 2) {
      point.column = columnStart[point.line];
      point.offset += columnStart[point.line] - 1;
    }
  }
}

/**
 * Get the chunks from a slice of chunks in the range of a token.
 *
 * @param {ReadonlyArray<Chunk>} chunks
 *   Chunks.
 * @param {Pick<Token, 'end' | 'start'>} token
 *   Token.
 * @returns {Array<Chunk>}
 *   Chunks.
 */
function sliceChunks(chunks, token) {
  const startIndex = token.start._index;
  const startBufferIndex = token.start._bufferIndex;
  const endIndex = token.end._index;
  const endBufferIndex = token.end._bufferIndex;
  /** @type {Array<Chunk>} */
  let view;
  if (startIndex === endIndex) {
    // @ts-expect-error `_bufferIndex` is used on string chunks.
    view = [chunks[startIndex].slice(startBufferIndex, endBufferIndex)];
  } else {
    view = chunks.slice(startIndex, endIndex);
    if (startBufferIndex > -1) {
      const head = view[0];
      if (typeof head === 'string') {
        view[0] = head.slice(startBufferIndex);
        /* c8 ignore next 4 -- used to be used, no longer */
      } else {
        view.shift();
      }
    }
    if (endBufferIndex > 0) {
      // @ts-expect-error `_bufferIndex` is used on string chunks.
      view.push(chunks[endIndex].slice(0, endBufferIndex));
    }
  }
  return view;
}

/**
 * Get the string value of a slice of chunks.
 *
 * @param {ReadonlyArray<Chunk>} chunks
 *   Chunks.
 * @param {boolean | undefined} [expandTabs=false]
 *   Whether to expand tabs (default: `false`).
 * @returns {string}
 *   Result.
 */
function serializeChunks(chunks, expandTabs) {
  let index = -1;
  /** @type {Array<string>} */
  const result = [];
  /** @type {boolean | undefined} */
  let atTab;
  while (++index < chunks.length) {
    const chunk = chunks[index];
    /** @type {string} */
    let value;
    if (typeof chunk === 'string') {
      value = chunk;
    } else switch (chunk) {
      case -5:
        {
          value = "\r";
          break;
        }
      case -4:
        {
          value = "\n";
          break;
        }
      case -3:
        {
          value = "\r" + "\n";
          break;
        }
      case -2:
        {
          value = expandTabs ? " " : "\t";
          break;
        }
      case -1:
        {
          if (!expandTabs && atTab) continue;
          value = " ";
          break;
        }
      default:
        {
          // Currently only replacement character.
          value = String.fromCharCode(chunk);
        }
    }
    atTab = chunk === -2;
    result.push(value);
  }
  return result.join('');
}

/**
 * @import {
 *   Create,
 *   FullNormalizedExtension,
 *   InitialConstruct,
 *   ParseContext,
 *   ParseOptions
 * } from 'micromark-util-types'
 */


/**
 * @param {ParseOptions | null | undefined} [options]
 *   Configuration (optional).
 * @returns {ParseContext}
 *   Parser.
 */
function parse(options) {
  const settings = options || {};
  const constructs = /** @type {FullNormalizedExtension} */
  combineExtensions([defaultConstructs, ...(settings.extensions || [])]);

  /** @type {ParseContext} */
  const parser = {
    constructs,
    content: create(content$1),
    defined: [],
    document: create(document$1),
    flow: create(flow$1),
    lazy: {},
    string: create(string$1),
    text: create(text$1)
  };
  return parser;

  /**
   * @param {InitialConstruct} initial
   *   Construct to start with.
   * @returns {Create}
   *   Create a tokenizer.
   */
  function create(initial) {
    return creator;
    /** @type {Create} */
    function creator(from) {
      return createTokenizer(parser, initial, from);
    }
  }
}

/**
 * @import {Event} from 'micromark-util-types'
 */


/**
 * @param {Array<Event>} events
 *   Events.
 * @returns {Array<Event>}
 *   Events.
 */
function postprocess(events) {
  while (!subtokenize(events)) {
    // Empty
  }
  return events;
}

/**
 * @import {Chunk, Code, Encoding, Value} from 'micromark-util-types'
 */

/**
 * @callback Preprocessor
 *   Preprocess a value.
 * @param {Value} value
 *   Value.
 * @param {Encoding | null | undefined} [encoding]
 *   Encoding when `value` is a typed array (optional).
 * @param {boolean | null | undefined} [end=false]
 *   Whether this is the last chunk (default: `false`).
 * @returns {Array<Chunk>}
 *   Chunks.
 */

const search = /[\0\t\n\r]/g;

/**
 * @returns {Preprocessor}
 *   Preprocess a value.
 */
function preprocess() {
  let column = 1;
  let buffer = '';
  /** @type {boolean | undefined} */
  let start = true;
  /** @type {boolean | undefined} */
  let atCarriageReturn;
  return preprocessor;

  /** @type {Preprocessor} */
  // eslint-disable-next-line complexity
  function preprocessor(value, encoding, end) {
    /** @type {Array<Chunk>} */
    const chunks = [];
    /** @type {RegExpMatchArray | null} */
    let match;
    /** @type {number} */
    let next;
    /** @type {number} */
    let startPosition;
    /** @type {number} */
    let endPosition;
    /** @type {Code} */
    let code;
    value = buffer + (typeof value === 'string' ? value.toString() : new TextDecoder(encoding || undefined).decode(value));
    startPosition = 0;
    buffer = '';
    if (start) {
      // To do: `markdown-rs` actually parses BOMs (byte order mark).
      if (value.charCodeAt(0) === 65279) {
        startPosition++;
      }
      start = undefined;
    }
    while (startPosition < value.length) {
      search.lastIndex = startPosition;
      match = search.exec(value);
      endPosition = match && match.index !== undefined ? match.index : value.length;
      code = value.charCodeAt(endPosition);
      if (!match) {
        buffer = value.slice(startPosition);
        break;
      }
      if (code === 10 && startPosition === endPosition && atCarriageReturn) {
        chunks.push(-3);
        atCarriageReturn = undefined;
      } else {
        if (atCarriageReturn) {
          chunks.push(-5);
          atCarriageReturn = undefined;
        }
        if (startPosition < endPosition) {
          chunks.push(value.slice(startPosition, endPosition));
          column += endPosition - startPosition;
        }
        switch (code) {
          case 0:
            {
              chunks.push(65533);
              column++;
              break;
            }
          case 9:
            {
              next = Math.ceil(column / 4) * 4;
              chunks.push(-2);
              while (column++ < next) chunks.push(-1);
              break;
            }
          case 10:
            {
              chunks.push(-4);
              column = 1;
              break;
            }
          default:
            {
              atCarriageReturn = true;
              column = 1;
            }
        }
      }
      startPosition = endPosition + 1;
    }
    if (end) {
      if (atCarriageReturn) chunks.push(-5);
      if (buffer) chunks.push(buffer);
      chunks.push(null);
    }
    return chunks;
  }
}

export { decodeNamedCharacterReference as a, postprocess as b, combineHtmlExtensions as c, decodeNumericCharacterReference as d, parse as e, preprocess as f, asciiAlphanumeric as g, asciiAlpha as h, unicodePunctuation as i, asciiControl as j, blankLine as k, factorySpace as l, markdownLineEndingOrSpace as m, normalizeIdentifier as n, classifyCharacter as o, push as p, markdownLineEnding as q, resolveAll as r, splice as s, markdownSpace as t, unicodeWhitespace as u, combineExtensions as v };
