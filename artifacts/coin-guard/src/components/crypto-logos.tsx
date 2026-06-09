import coinbasePng from "@assets/image_1772019849220.png";
import binancePng from "@assets/image_1772019861108.png";
import krakenPng from "@assets/image_1772019884115.png";
import geminiPng from "@assets/image_1773397272301.png";
import kucoinPng from "@assets/image_1772019947344.png";
import okxPng from "@assets/image_1772019974151.png";
import metamaskPng from "@assets/image_1772019988177.png";
import phantomPng from "@assets/image_1772020043190.png";
import exodusPng from "@assets/image_1772020067988.png";
import ledgerPng from "@assets/image_1772020105370.png";
import trezorPng from "@assets/image_1773397420544.png";
import cryptocomPng from "@assets/image_1772020201503.png";
import tangemLogoPng from "@assets/image_1772237704182.png";
import arculusLogoPng from "@assets/image_1772237745870.png";
import ledgerDevicesPng from "@assets/image_1772237858276.png";
import ledgerStaxDevicePng from "@assets/ledger-stax-face_1773397158214.webp";
import ledgerFlexDevicePng from "@assets/flex_magenta_front_desktop_1773397158215.webp";
import ledgerNanoGen5DevicePng from "@assets/lng5_desktop_1773397158215.webp";
import ledgerNanoClassicsDevicePng from "@assets/classic_nanos_desktop_1773397158215.webp";
import trezorSafe5Png from "@assets/image_1773397180858.png";
import trezorSafe3Png from "@assets/image_1773397170194.png";
import tangemCardPng from "@assets/image_1772238008722.png";
import tangemRingPng from "@assets/image_1772238130150.png";
import arculusCardPng from "@assets/image_1772238428564.png";
import arculusSilverPng from "@assets/image_1772239831412.png";
import trezorSafe7Png from "@assets/image_1773397186934.png";
import trustWalletPng from "@assets/image_1772244086211.png";
import coinGuardShieldPng from "@assets/image_1772237651695.png";
import robinhoodExchangePng from "@assets/image_1773397544094.png";
import robinhoodWalletPng from "@assets/image_1773397647028.png";
import mexcPng from "@assets/image_1773398023889.png";
import bybitPng from "@assets/image_1773398046341.png";
import tangemBlackCardPng from "@assets/image_1773398073007.png";

function LogoImg({ src, alt, className = "w-5 h-5" }: { src: string; alt: string; className?: string }) {
  return <img src={src} alt={alt} className={`${className} object-contain dark:brightness-110 dark:contrast-110`} loading="lazy" />;
}

export function CoinbaseLogo({ className = "w-5 h-5" }: { className?: string }) {
  return <LogoImg src={coinbasePng} alt="Coinbase" className={className} />;
}

export function BinanceLogo({ className = "w-5 h-5" }: { className?: string }) {
  return <LogoImg src={binancePng} alt="Binance" className={className} />;
}

export function KrakenLogo({ className = "w-5 h-5" }: { className?: string }) {
  return <LogoImg src={krakenPng} alt="Kraken" className={className} />;
}

export function GeminiLogo({ className = "w-5 h-5" }: { className?: string }) {
  return <LogoImg src={geminiPng} alt="Gemini" className={className} />;
}

export function KuCoinLogo({ className = "w-5 h-5" }: { className?: string }) {
  return <LogoImg src={kucoinPng} alt="KuCoin" className={className} />;
}

export function OkxLogo({ className = "w-5 h-5" }: { className?: string }) {
  return <LogoImg src={okxPng} alt="OKX" className={className} />;
}

export function MetaMaskLogo({ className = "w-5 h-5" }: { className?: string }) {
  return <LogoImg src={metamaskPng} alt="MetaMask" className={className} />;
}

export function PhantomLogo({ className = "w-5 h-5" }: { className?: string }) {
  return <LogoImg src={phantomPng} alt="Phantom" className={className} />;
}

export function ExodusLogo({ className = "w-5 h-5" }: { className?: string }) {
  return <LogoImg src={exodusPng} alt="Exodus" className={className} />;
}

export function LedgerLogo({ className = "w-5 h-5" }: { className?: string }) {
  return <LogoImg src={ledgerPng} alt="Ledger" className={className} />;
}

export function TrezorLogo({ className = "w-5 h-5" }: { className?: string }) {
  return <LogoImg src={trezorPng} alt="Trezor" className={className} />;
}

export function CryptocomLogo({ className = "w-5 h-5" }: { className?: string }) {
  return <LogoImg src={cryptocomPng} alt="Crypto.com" className={className} />;
}

export function BitfinexLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className}>
      <circle cx="16" cy="16" r="16" fill="#16B157"/>
      <path d="M8 16l4-6h8l4 6-4 6h-8l-4-6zm5-4l-3 4 3 4h6l3-4-3-4h-6z" fill="#fff"/>
    </svg>
  );
}

export function BitstampLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className}>
      <circle cx="16" cy="16" r="16" fill="#2DAC49"/>
      <path d="M10 10h12v3H10v-3zm2 5h8v3h-8v-3zm-2 5h12v3H10v-3z" fill="#fff"/>
    </svg>
  );
}

export function GateioLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className}>
      <circle cx="16" cy="16" r="16" fill="#2354E6"/>
      <path d="M16 8a8 8 0 100 16 8 8 0 000-16zm0 2.5a5.5 5.5 0 11-.01 11 5.5 5.5 0 01.01-11zm0 2a3.5 3.5 0 100 7h3.5v-3.5A3.5 3.5 0 0016 12.5z" fill="#fff"/>
    </svg>
  );
}

export function HuobiLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className}>
      <circle cx="16" cy="16" r="16" fill="#2DAA9E"/>
      <path d="M16 7c-2 3-5 5-5 9a5 5 0 0010 0c0-4-3-6-5-9z" fill="#fff"/>
    </svg>
  );
}

export function BybitLogo({ className = "w-5 h-5" }: { className?: string }) {
  return <LogoImg src={bybitPng} alt="Bybit" className={className} />;
}

export function MexcLogo({ className = "w-5 h-5" }: { className?: string }) {
  return <LogoImg src={mexcPng} alt="MEXC" className={className} />;
}

export function TangemLogo({ className = "w-5 h-5" }: { className?: string }) {
  return <LogoImg src={tangemLogoPng} alt="Tangem" className={className} />;
}

export function ArculusLogo({ className = "w-5 h-5" }: { className?: string }) {
  return <LogoImg src={arculusLogoPng} alt="Arculus" className={className} />;
}

export function TrustWalletLogo({ className = "w-5 h-5" }: { className?: string }) {
  return <LogoImg src={trustWalletPng} alt="Trust Wallet" className={className} />;
}

export function RobinhoodLogo({ className = "w-5 h-5" }: { className?: string }) {
  return <LogoImg src={robinhoodExchangePng} alt="Robinhood" className={className} />;
}

export function RobinhoodWalletLogo({ className = "w-5 h-5" }: { className?: string }) {
  return <LogoImg src={robinhoodWalletPng} alt="Robinhood Wallet" className={className} />;
}

export { ledgerDevicesPng, ledgerStaxDevicePng, ledgerFlexDevicePng, ledgerNanoGen5DevicePng, ledgerNanoClassicsDevicePng, trezorSafe7Png, trezorSafe5Png, trezorSafe3Png, tangemCardPng, tangemRingPng, tangemBlackCardPng, arculusCardPng, arculusSilverPng, coinGuardShieldPng };

export function EthereumLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className}>
      <circle cx="16" cy="16" r="16" fill="#627EEA"/>
      <path d="M16 5v8.87l7.5 3.35L16 5z" fill="rgba(255,255,255,0.6)"/>
      <path d="M16 5L8.5 17.22 16 13.87V5z" fill="#fff"/>
      <path d="M16 22.44v4.56l7.5-10.38L16 22.44z" fill="rgba(255,255,255,0.6)"/>
      <path d="M16 27v-4.56L8.5 16.62 16 27z" fill="#fff"/>
      <path d="M16 20.94l7.5-3.72L16 13.87v7.07z" fill="rgba(255,255,255,0.2)"/>
      <path d="M8.5 17.22L16 20.94v-7.07l-7.5 3.35z" fill="rgba(255,255,255,0.6)"/>
    </svg>
  );
}

export function BitcoinLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className}>
      <circle cx="16" cy="16" r="16" fill="#F7931A"/>
      <path d="M21.2 14.1c.3-2.1-1.3-3.2-3.5-3.9l.7-2.8-1.7-.4-.7 2.8c-.5-.1-.9-.2-1.4-.3l.7-2.8-1.7-.4-.7 2.8c-.4-.1-.7-.2-1.1-.3l-2.4-.6-.5 1.8s1.3.3 1.2.3c.7.2.8.6.8 1l-.8 3.3c0 0 .1 0 .1 0l-.1 0-1.2 4.7c-.1.2-.3.6-.8.4 0 0-1.2-.3-1.2-.3L6 21l2.2.6c.4.1.8.2 1.2.3l-.7 2.9 1.7.4.7-2.9c.5.1.9.2 1.4.3l-.7 2.8 1.7.4.7-2.8c2.9.5 5.1.3 6-2.3.7-2.1 0-3.3-1.5-4.1 1.1-.3 1.9-1 2.1-2.5zm-3.8 5.3c-.5 2.1-4.1 1-5.3.7l1-3.8c1.1.3 4.9.8 4.4 3.1zm.5-5.3c-.5 1.9-3.5.9-4.5.7l.9-3.5c1 .3 4.1.7 3.6 2.8z" fill="#fff"/>
    </svg>
  );
}

export function SolanaLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className}>
      <circle cx="16" cy="16" r="16" fill="#000"/>
      <linearGradient id="sol" x1="8" y1="24" x2="24" y2="8">
        <stop offset="0" stopColor="#9945FF"/>
        <stop offset="1" stopColor="#14F195"/>
      </linearGradient>
      <path d="M9 20.5l2-2h12l-2 2H9zm0-4.5l2-2h12l-2 2H9zm14-4.5l-2 2H9l2-2h12z" fill="url(#sol)"/>
    </svg>
  );
}
