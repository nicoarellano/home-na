import { setRequestLocale } from 'next-intl/server'
import { PolicyLayout } from '@/components/policy/PolicyLayout'

interface Props {
  params: Promise<{ locale: string }>
}

export default async function CookiePolicy({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <PolicyLayout
      eyebrow="Legal"
      title="Cookie Policy"
      brand="cookiespolicy"
      lastUpdated="April 8, 2026"
      effectiveDate="April 8, 2026"
    >
      <h2>What are cookies?</h2>
      <p>
        This Cookie Policy explains what cookies are, how we use them, the types of cookies we use
        (i.e., the information we collect using cookies and how that information is used), and how
        to manage your cookie settings.
      </p>
      <p>
        Cookies are small text files used to store small pieces of information. They are stored on
        your device when a website loads in your browser. These cookies help ensure that the website
        functions properly, enhance security, provide a better user experience, and analyse
        performance to identify what works and where improvements are needed.
      </p>

      <h2>How do we use cookies?</h2>
      <p>
        Like most online services, our website uses both first-party and third-party cookies for
        various purposes. First-party cookies are primarily necessary for the website to function
        properly and do not collect any personally identifiable data.
      </p>
      <p>
        The third-party cookies used on our website primarily help us understand how the website
        performs, track how you interact with it, keep our services secure and enhance your overall
        user experience while improving the speed of your future interactions with our website.
      </p>

      <h2>Types of cookies we use</h2>
      <div className="cky-audit-table-element" />

      <h2>Manage cookie preferences</h2>
      <p>You can update your cookie preferences at any time by clicking the button below.</p>
      <a className="policy-consent-btn cky-banner-element">Consent Preferences</a>
      <p>
        Additionally, different browsers offer various methods to block and delete cookies used by
        websites. You can adjust your browser settings to block or delete cookies. Below are links
        to support documents on how to manage and delete cookies in major web browsers.
      </p>
      <ul>
        <li>
          Chrome:{' '}
          <a target="_blank" rel="noopener noreferrer" href="https://support.google.com/accounts/answer/32050">
            https://support.google.com/accounts/answer/32050
          </a>
        </li>
        <li>
          Safari:{' '}
          <a target="_blank" rel="noopener noreferrer" href="https://support.apple.com/en-in/guide/safari/sfri11471/mac">
            https://support.apple.com/en-in/guide/safari/sfri11471/mac
          </a>
        </li>
        <li>
          Firefox:{' '}
          <a target="_blank" rel="noopener noreferrer" href="https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox">
            https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox
          </a>
        </li>
        <li>
          Internet Explorer:{' '}
          <a target="_blank" rel="noopener noreferrer" href="https://support.microsoft.com/en-us/topic/how-to-delete-cookie-files-in-internet-explorer-bca9446f-d873-78de-77ba-d42645fa52fc">
            https://support.microsoft.com/en-us/topic/how-to-delete-cookie-files-in-internet-explorer-bca9446f-d873-78de-77ba-d42645fa52fc
          </a>
        </li>
      </ul>
      <p>If you are using a different web browser, please refer to its official support documentation.</p>
    </PolicyLayout>
  )
}
