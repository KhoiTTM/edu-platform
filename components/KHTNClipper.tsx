"use client";

import { useState, useMemo, useEffect } from "react";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";

interface KHTNClipperProps {
  lessonSlug: string;
  initialPage?: number;
  onPageChange?: (page: number) => void;
}

/**
 * KHTN 7 Sách Bài Tập - Google Drive Folder
 * https://drive.google.com/drive/folders/1J4JjYhqJcOgr4NIVTv3m8z82hwJJ00sk?usp=drive_link
 * Total pages: 147
 */
const GOOGLE_DRIVE_FILE_IDS: Record<number, string> = {
  1: "1w4iFhSA_Oo_vhccoMt9OO0oHq_AzdvUD",
  2: "154lWXXWK8v1EoiNomsTPwsVwDcsa7kLG",
  3: "1IjEO7ahwXdOt73b0gJXe8xzmJVKYl_E6",
  4: "1LBv6krXquXwpQRWYTBAtVpXd139VShGS",
  5: "1p6Yo_hA-Rm97V6BoGzBirxRU8uITRVrS",
  6: "1w7nS0AHOpeCDkGQgmzKZycFdegSkw5yp",
  7: "1_VznXZD3SlKSh587CQ3-LGbbCLwIaoQV",
  8: "1SxP9j7tOKvujZhNDkxbCl0okh2mW3Jqp",
  9: "1lxaIPQrTAN6efUSI-Uvq9CqdWyv45cHj",
  10: "1WrrwxpcXYQuKps6PcJ4nf_dhPc4xsMQ4",
  11: "1g2DFgsh0iJefa3LMR8_efd5IzVgE7etg",
  12: "1Z9w-eGq7WwDTx3icC56yJv2Ppv2etyDK",
  13: "1OzJmFb5a82wSX0oGOt6KsFy5CXAf0DFn",
  14: "1f5dVaQmHZXzA4Ba9eFSv6iZ6w4mhd0Er",
  15: "1trhwSLhCZuWrBjPckagx9Y2gOBNkmKVg",
  16: "1hoBYcTfouBMnlisX7DSsSJXGx8tmIrO1",
  17: "1lTVrCv6bcVMxOhaOQ_aa07ZNsxZE4L9q",
  18: "1MpUPRIrpZj6ANpgp7G9VC8scmmR-qA8r",
  19: "1RtsxHauikgAImDV5GLhh75O09ZAuV8Ru",
  20: "1L2DQK74S6_jKViipWO3kMGmb7_h6y2af",
  21: "1mRgYSyfzfi2zEuTkLxvmmHp7r6kekTNL",
  22: "1OOvRW6wzh5kjdBej2E3LGayY1icV5nNF",
  23: "1R98TDBe_fw_UpwFA1N4rq29wk2LvA3Qx",
  24: "1FIDURn8HnybOkhrm-GTwcKFYWKerjwYa",
  25: "16LHUoxpfvyPQbnZDPmuOp8dZoEMSqB2f",
  26: "1IhuncShmfYwug5pyx4LNt161TA-pEAec",
  27: "1BLUP8JnYinynV43Xu6eEVKKOa-ay8wD3",
  28: "1o7npiijIg3YxLeu4JrEU4sK9qHkTsMov",
  29: "1jNAJwfKV7_W0VxyenQsmoYTM5uS9nHzU",
  30: "18p4eIzNJtBTCsMful4ybAC_5oyxw8AFU",
  31: "1DA93rEJC5ziL0BwK9xIJIwFImpMKUp8e",
  32: "1NTk47yUOpRfcq89L9tlTlyioZu-shLi7",
  33: "1obrj-fXlDWhKOw2NvmdGI3jYfBttiRGN",
  34: "1Jdfs5AAGF2ARvtJeboTe8sISfhMrxtv5",
  35: "1u9CsCNl4dIzmNfue144mhCP3Ved6V5OF",
  36: "1Km4finghPd-izFRPKJOSY6AhE9NZINe-",
  37: "1Mm8r7I1jsLrJatXyicU8t67HqUxnPKMA",
  38: "1hYH_TNTsvB79MArWfdScOQUNlux9Rfgy",
  39: "1mn-YmGxzneEiBxNYKjeQqIeMPXVHLR-w",
  40: "1TdLtmY6cBuCR3h2AF5Kq7FbQ2aLUZF01",
  41: "17s2m_359WHV_7y4NaDkxUJlX--04pZQN",
  42: "1ZLScZiBkLhZDaZ37WLbjUd6Epu2Orw0R",
  43: "1abGmOINC1BseaJ7kr0qhtKThhxd2TcCU",
  44: "1QVCqzAL_EJDsoJk-Xgd3uvpHcoVvjWVu",
  45: "17Dq7eq5oHi96Uwk3d4kjx4ELR3TC-E6f",
  46: "1W2VxrGZlc4RxU3bEv_EfsCZeq-0vOBog",
  47: "1xY2u-hc-mCgPcsqgzGJTK-eioGimqvEt",
  48: "1XCjSfIKyYm4NBPeqjTNQnX_A6B2B6Wyh",
  49: "1ZJ9iSueZGSjAmJbt80YBNgIPsRDf2W4J",
  50: "1kTE7P04VIrHSnNosQOEcsyjfs6KU8haZ",
  51: "11T79QLTidzemIHQElzBskRYj78HuGnwi",
  52: "1KM_NXaOB_86pEyRw06pBqBBDG-uzMAfH",
  53: "1_vujWQC2AeyR5YXQSJDLWGB2qfGTT3zB",
  54: "17AGVbeEzOkCL9gzN0IakqJ-vGN61Yxur",
  55: "1VZqJxCac3xm8o8OH0VjHg9y8I0reNAp0",
  56: "1dYEtgtMhSOb9ublMT6wKc2kaa4yO_BwN",
  57: "1hJD1h3VrjcoE8q9OELBZu8WIXNmR9UF5",
  58: "1hLi7KKhEanZ3CJT64Sm1ajHL52QC1KFW",
  59: "1n9ZE0psvhA4v-PkV5bAhCVyv4VfWsAsk",
  60: "1p0jXiOUIZnO4Kcvyw11MRyMgOX9gqNM4",
  61: "1hQZARd9vQ6dwDMmpLfrjmo_S_9kbSxMj",
  62: "1vQ-Wk_jNmHJbINcoLQFqMZHKRFB5x2V_",
  63: "1eShRXQCHVzMVz1JR_UPjf8Qv1vXO2gP-",
  64: "1pXwgogd65aoPre3qhuyBsXHJmFVoB-T-",
  65: "1MKUQUj9vJhluQ2GIvAAZx0EkGGi17ddv",
  66: "1xPcBsdK6sdMs58RXJZKc_ZwqzGgI6Qku",
  67: "1qo37XLwhN3MAoUuc4xhtlFpVCt_rPfAg",
  68: "1odfJM-PebR1GyJIfRhP1_E_j82VhfXVX",
  69: "1nakY-ta9jfGug8NYvkqDboLsDEermNHW",
  70: "1Dpkw8Y_Bqpxjd-g2aXGx9rKA4CQ2_28x",
  71: "1clQdXf7TobqNbE8jzJ2ZDbjRMaO0EE7Z",
  72: "1w5pgt4GpjZzBfIvb63G2Mb8lOhofsbOG",
  73: "1JQHrefHP7QN4nlkK2xPrHUILQOZpq3wz",
  74: "1YzkUDyojc61P6cil6D6W1q-G2Cn4IrOi",
  75: "18M33kYgTeDCdCzTlDFyBttSjYgUFEp03",
  76: "1GJ71RznFC-GZbgr2ovMmZ5rGF7pbGA_6",
  77: "1qWRgsT2YaLAg_s6Nu16k7lVB3cPLn7iH",
  78: "1DC7FzTSN0V-5QLYQ5lpvssYfvRQSZABi",
  79: "1RZ5GpoBfUXbMLbK8FavhzFx90QAneDyT",
  80: "1p5kLg5mV0FG0QPdhxbMuFC7ptwwuUx4y",
  81: "1pZSUc5tJb6qJ0-K1-ru8PjXEL4FYF78k",
  82: "1piH1a6oeAmuxIgKQH7u9AttZKpod8Kcx",
  83: "1ya8xGDbdnqgLrja0G1gdyWw2OFjw6uZX",
  84: "1iuM-dejbR6FeLodN7p3ZBolvitJeAgkP",
  85: "10LaSQwU7daelHdku8GPcaz1W0tTd057n",
  86: "1LYnPP0xcqhIfUBxQkvTh0dtWkuW-jCMY",
  87: "1AACGQuLFB4yZgg8FVpbD_2DZKXJPaOIU",
  88: "1IuVaX6-lAgxYeujeS54xEP6yOSW6Aca3",
  89: "1jmu-zksfiK_v1cwN_SkkBOoDhND_aWCI",
  90: "1Ujg_ezZxt5U5UJsbynZyuk8URB1JMldA",
  91: "1oSYprW-UUx2lYD4G0oz59-TWGWXPbMMc",
  92: "1fQU-Ta0HWjsosVCOUSojkZg2ok6Pwv0K",
  93: "1NWUd3gA8yDUF1iICylEIUu_bR-vWDtXf",
  94: "1gdPjNcHgtDIzEn1OZcw9kDcpgdFjU8Fm",
  95: "1o9dqI1J4jSi6KCEyC7FCJRISId3sE69f",
  96: "1b-V_JIOC6ib3CM4YcmRLPHYkNkpftFL5",
  97: "1fCQRup8CXkMdZJ5L1i13jLwSQZSXGWzf",
  98: "1Evuf5L3ZCNFsvW7hBr4ZM1BCfjzygBgn",
  99: "1iE33aRqRfuJx3gvTyKVtCCFKr-R4LkXW",
  100: "1YyhxffmCkbt-eF1qO65gz8fkye4-dUMQ",
  101: "161TZC9x6awJEdnVdfyXYsrKxW1ClFrQK",
  102: "1JWIQ3zDwr4ZNejezqPfixa7W7YT79q1O",
  103: "1_TlgnNbaX-patShgPHIeVA0ccj6WPleU",
  104: "12qJ9LRwQBgG3Dgd13eZ7kXZmIxgyleWi",
  105: "1VOyHEi8Zqj0VKc0xJxO1moXnVqcDUJKG",
  106: "1as5tQK88Bh9wVzBJcnpJjCzuu7Nw2fDb",
  107: "1ni49g3O149d7sMwSu2aWxuyJbn-kiAY-",
  108: "1i5SKw8CpnstEdGPLs8aLj00uiFB8qCID",
  109: "10YGAS_RAOiBSE41yfiZOg29SuD2tNcTQ",
  110: "1tpxu1jPrmCTR_SQJXnidGZjyvjAsWaIi",
  111: "1ncl2EqxucKh2W_l9_QX9i2GshWIj_-sB",
  112: "1addW8zrOfwvwlMzIkZrqVYWqBGStc8Uo",
  113: "1-jIkrySQdWDj1vCUVmVilFUftjC-b3Vc",
  114: "1WcMlMrTOlYnWuYgprdIiIlm6aYYmisdw",
  115: "1vucoPUkN_MHQb-zMHwP1rERQ2tZfGEc9",
  116: "11eaBmuv4Uq6vbK08fxvGKFXOgGfb3K0I",
  117: "1R9H0xmyGBsij8ELqfWbpZs6Eug35B_iH",
  118: "18DZfNh9ubDk93ZjG1z0oFx3_fkM5RfCI",
  119: "1xluleL5HHci432icqHViMiLfxVzmaiqF",
  120: "19mWKAE04asU4fidB-WsN7ye9jD7OAMcN",
  121: "1HamqLhMG4y5RAuTicVnQCn14Do_IH-2U",
  122: "1fmVCcSuJf1Elt28yaPO0kjzD7VPYxkhu",
  123: "1D_xhS4aR9dmfKSY29y4y_qRrXFODZrlX",
  124: "1q2JrUeygw22epG4ROWrp4kGSnrKrVzBj",
  125: "1zUxLn15wWYOYdHGrkpQ2TQ5m3yimjOma",
  126: "10ly9ZPV3g9YW-lDqPT7PDPv2nl7zkNok",
  127: "1qm2tQYSrM29QNokBaOgs81KHwA7gjWa6",
  128: "1OiNlAzokEmsKCztVTW62FaiUOVkytR-v",
  129: "1IBwRCoVyvyy9xJkX0YMOIyyGT7ikDh9Z",
  130: "1tFrRDqbkyPaIDLWZ8qllvEMGZW2Zeibw",
  131: "19T1wbcPh_m9niw0lGpzpPd5ihV9DcEnr",
  132: "1-VCF87DCh9Q1c1KQP8PDP8_7lzMet7or",
  133: "1B8z3-WKq2tWIXva7PPeUoM0scQBOyLDt",
  134: "1VxFOR61mmwBoGnwkDmg1Q0Od8ltOKFjw",
  135: "1mC7ABOLitYt1uIkgzdDQRTgKSmHe20Ll",
  136: "1pA2-jXJ4uF0eAE_1stdfGAK3MUzvmNBg",
  137: "1ryq2kUEmjSQupUiSchlhfHBvM1_qz_zR",
  138: "1CmxbbvMzcCqJ7Av26lqp9m2KAh7dKG58",
  139: "1DJ7fE59yfYDMtN-jtAbKuSs2xw8nA9c-",
  140: "1AHwP4dr3E_GwrLbl4W36UZNPKX5Dq2_3",
  141: "1nsDCCuFgSprr3rJ-NF0Fa7nG_uItYTos",
  142: "1yANRRQgN_5G9c_P7mlEK6lWeLX3mg-pi",
  143: "1thY4m26O7mNO-f_sjSaJdpPDdPi0GgbY",
  144: "1NMXGws0Z0LIwwD9agWkXkvPalQ-_P1Ay",
  145: "1EtiOKyDMLz_JUGBtJFXtPW5DU8yGkkcD",
  146: "11rdY-Cqw7EH8RozFF0QXkzecS4TLPgbL",
  147: "1NGbvSJIrQ0kmCQhkMrr0Pwp-tYsSmo6g",
};

export function KHTNClipper({ lessonSlug, initialPage = 1, onPageChange }: KHTNClipperProps) {
  console.log(`[KHTNClipper-render] lessonSlug=${lessonSlug}, initialPage=${initialPage}`);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageInput, setPageInput] = useState("");

  // Update current page when initialPage prop changes
  useEffect(() => {
    console.log(`[KHTNClipper-useEffect] initialPage changed to: ${initialPage}, setting currentPage`);
    setCurrentPage(initialPage);
  }, [initialPage]);

  // Allow viewing any page from 1-147
  const minPage = 1;
  const maxPage = 147;
  const displayPage = currentPage;

  const handleJumpToPage = () => {
    const page = parseInt(pageInput);
    if (!isNaN(page) && page >= minPage && page <= maxPage) {
      setCurrentPage(page);
      onPageChange?.(page);
      setPageInput("");
    }
  };

  const getImageUrl = (pageNum: number) => {
    const fileId = GOOGLE_DRIVE_FILE_IDS[pageNum];
    if (!fileId) return null;
    return `https://drive.google.com/file/d/${fileId}/preview`;
  };

  const handlePrevPage = () => {
    const newPage = Math.max(minPage, currentPage - 1);
    setCurrentPage(newPage);
    onPageChange?.(newPage);
  };

  const handleNextPage = () => {
    const newPage = Math.min(maxPage, currentPage + 1);
    setCurrentPage(newPage);
    onPageChange?.(newPage);
  };

  const imageUrl = getImageUrl(displayPage);

  return (
    <div className="flex flex-col h-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-lg">
      <div className="bg-gradient-to-r from-indigo-600 to-cyan-600 px-4 py-3 text-white font-bold flex items-center justify-between">
        <span className="text-sm">📖 Sách Bài Tập</span>
        <span className="text-xs bg-white/20 px-2 py-1 rounded">
          Trang {displayPage}/147
        </span>
      </div>

      <div className="flex-1 overflow-hidden bg-black flex items-center justify-center relative">
        {imageUrl ? (
          <iframe
            src={imageUrl}
            title={`Page ${displayPage}`}
            className="w-full h-full border-0"
            allow="autoplay"
            sandbox="allow-same-origin allow-scripts allow-popups allow-popups-to-escape-sandbox"
          />
        ) : (
          <div className="text-slate-400 text-center">
            <p>Không tìm thấy trang {displayPage}</p>
          </div>
        )}
      </div>

      <div className="bg-slate-800 px-4 py-3 flex items-center justify-between border-t border-slate-700 flex-wrap gap-2">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="p-2 rounded-lg hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft size={20} className="text-cyan-400" />
        </button>

        <div className="flex items-center gap-2">
          <input
            type="range"
            min="1"
            max="147"
            value={currentPage}
            onChange={(e) => {
              const page = parseInt(e.target.value);
              setCurrentPage(page);
              onPageChange?.(page);
            }}
            className="w-32 cursor-pointer"
          />
          <span className="text-xs text-slate-400 whitespace-nowrap">
            {currentPage}/147
          </span>
        </div>

        <div className="flex items-center gap-1">
          <input
            type="number"
            min="1"
            max="147"
            value={pageInput}
            onChange={(e) => setPageInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleJumpToPage()}
            placeholder="Trang"
            className="w-12 px-2 py-1 rounded bg-slate-700 text-white text-xs border border-slate-600 focus:border-cyan-400 focus:outline-none"
          />
          <button
            onClick={handleJumpToPage}
            className="px-2 py-1 rounded text-xs bg-cyan-600 text-white hover:bg-cyan-500 transition-colors"
          >
            Go
          </button>
        </div>

        <button
          onClick={handleNextPage}
          disabled={currentPage === maxPage}
          className="p-2 rounded-lg hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Next page"
        >
          <ChevronRight size={20} className="text-cyan-400" />
        </button>

        <a
          href={`https://drive.google.com/file/d/${GOOGLE_DRIVE_FILE_IDS[displayPage]}/view`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg hover:bg-slate-700 transition-colors text-cyan-400 ml-auto"
          title="Mở trên Google Drive"
        >
          <Download size={18} />
        </a>
      </div>
    </div>
  );
}
