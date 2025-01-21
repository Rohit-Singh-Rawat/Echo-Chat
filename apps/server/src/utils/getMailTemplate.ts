interface EmailOptions {
  tag:
    | 'verify-email'
    | 'password_reset'
    | 'subscription_active'
    | 'free_trial_active'
  message?: string
  email?: string
  username?: string
  razorpayId?: string
  dateOfActivation?: string
  planId?: string
  planName?: string
  duration?: number
  price?: number
  dashboardLink?: string
}

export const getTemplate = (options: EmailOptions): string => {
  const baseTemplate = (content: string) => `
      <div style="margin-left:auto;margin-right:auto;margin-top:auto;margin-bottom:auto;background-color:rgb(255,255,255);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'">
        <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="max-width:500px;margin-left:auto;margin-right:auto;margin-top:2.5rem;margin-bottom:2.5rem;border-radius:0.25rem;border-width:1px;border-style:solid;border-color:rgb(229,231,235);padding-left:2.5rem;padding-right:2.5rem;padding-top:1.25rem;padding-bottom:1.25rem">
          <tbody>
            <tr style="width:100%">
              <td>
                <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="margin-top:2rem">
                  <tbody>
                    <tr>
                      <td>
                        <img alt="Echo Chat" height="40" src="https://res.cloudinary.com/ytx/image/upload/v1736163180/echo_gmxbwc.png" style="display:block;outline:none;border:none;text-decoration:none;margin-left:auto;margin-right:auto;margin-top:0px;margin-bottom:0px" />
                      </td>
                    </tr>
                  </tbody>
                </table>
                ${content}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  `

  const verifyEmailTemplate = `
    <h1 style="margin-left:0px;margin-right:0px;margin-top:1.75rem;margin-bottom:1.75rem;padding:0px;text-align:center;font-size:1.25rem;line-height:1.75rem;font-weight:600;color:rgb(0,0,0)">
      Please confirm your email address
    </h1>
    <p style="font-size:0.875rem;line-height:1.5rem;margin:16px 0;margin-left:auto;margin-right:auto">
      Enter this code on the Echo Chat verify page to complete your sign up:
    </p>
    <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="margin-top:2rem;margin-bottom:2rem">
      <tbody>
        <tr>
          <td>
            <div style="margin-left:auto;margin-right:auto;width:fit-content;border-radius:0.75rem;padding-left:1.5rem;padding-right:1.5rem;padding-top:0.75rem;padding-bottom:0.75rem;text-align:center;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,'Liberation Mono','Courier New',monospace;font-size:1.5rem;line-height:2rem;font-weight:600;letter-spacing:0.25em">
              ${options.message}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <p style="font-size:0.875rem;line-height:1.5rem;margin:16px 0;color:rgb(0,0,0)">
      This code expires in 10 minutes.
    </p>
    <hr style="width:100%;border:none;border-top:1px solid #eaeaea;margin-left:0px;margin-right:0px;margin-top:1.5rem;margin-bottom:1.5rem;border-width:1px;border-color:rgb(229,231,235)">
    <p style="font-size:12px;line-height:1.5rem;margin:16px 0;color:rgb(107,114,128)">
      This email was intended for <span style="color:rgb(0,0,0)"><a href="mailto:${options.email}" target="_blank">${options.email}</a></span>. 
      If you were not expecting this email, you can ignore this email. If you are concerned about your account's safety, 
      please reply to this email to get in touch with us.
    </p>
  `

  const passwordResetTemplate = `
    <h1 style="margin-left:0px;margin-right:0px;margin-top:1.75rem;margin-bottom:1.75rem;padding:0px;text-align:center;font-size:1.25rem;line-height:1.75rem;font-weight:600;color:rgb(0,0,0)">
      Reset your password
    </h1>
    <p style="font-size:0.875rem;line-height:1.5rem;margin:16px 0;margin-left:auto;margin-right:auto">
      Enter this code to reset your password:
    </p>
    <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="margin-top:2rem;margin-bottom:2rem">
      <tbody>
        <tr>
          <td>
            <div style="margin-left:auto;margin-right:auto;width:fit-content;border-radius:0.75rem;padding-left:1.5rem;padding-right:1.5rem;padding-top:0.75rem;padding-bottom:0.75rem;text-align:center;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,'Liberation Mono','Courier New',monospace;font-size:1.5rem;line-height:2rem;font-weight:600;letter-spacing:0.25em">
              ${options.message}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <p style="font-size:0.875rem;line-height:1.5rem;margin:16px 0;color:rgb(0,0,0)">
      This code expires in 10 minutes.
    </p>
    <hr style="width:100%;border:none;border-top:1px solid #eaeaea;margin-left:0px;margin-right:0px;margin-top:1.5rem;margin-bottom:1.5rem;border-width:1px;border-color:rgb(229,231,235)">
    <p style="font-size:12px;line-height:1.5rem;margin:16px 0;color:rgb(107,114,128)">
      If you did not request this password reset, you can ignore this email.
    </p>
  `

  const subscriptionActiveTemplate = `
    <h1 style="margin-left:0px;margin-right:0px;margin-top:1.75rem;margin-bottom:1.75rem;padding:0px;text-align:center;font-size:1.25rem;line-height:1.75rem;font-weight:600;color:rgb(0,0,0)">
      Thanks for going Premium!
    </h1>
    <p style="font-size:0.875rem;line-height:1.5rem;margin:16px 0;margin-left:auto;margin-right:auto">
      Your payment has been successfully processed. Here are your order details:
    </p>
    <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="margin-top:2rem;margin-bottom:2rem">
      <tbody>
        <tr>
          <td style="background-color:rgb(249,250,251);border-radius:0.75rem;padding:1.5rem">
            <table style="width:100%">
              <tr>
                <td style="padding-bottom:1rem">
                  <p style="font-size:0.75rem;color:rgb(107,114,128);margin:0">Payment ID</p>
                  <p style="font-size:0.875rem;margin:0.25rem 0 0">${options.razorpayId}</p>
                </td>
                <td style="padding-bottom:1rem">
                  <p style="font-size:0.75rem;color:rgb(107,114,128);margin:0">Date</p>
                  <p style="font-size:0.875rem;margin:0.25rem 0 0">${options.dateOfActivation}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p style="font-size:0.75rem;color:rgb(107,114,128);margin:0">Plan</p>
                  <p style="font-size:0.875rem;margin:0.25rem 0 0">${options.planName}</p>
                </td>
                <td>
                  <p style="font-size:0.75rem;color:rgb(107,114,128);margin:0">Amount</p>
                  <p style="font-size:0.875rem;margin:0.25rem 0 0">₹${options.price}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <hr style="width:100%;border:none;border-top:1px solid #eaeaea;margin-left:0px;margin-right:0px;margin-top:1.5rem;margin-bottom:1.5rem;border-width:1px;border-color:rgb(229,231,235)">
    <p style="font-size:12px;line-height:1.5rem;margin:16px 0;color:rgb(107,114,128)">
      You can view your subscription details at any time from your <a href="${options.dashboardLink}" style="color:rgb(37,99,235);text-decoration:none">dashboard</a>.
    </p>
  `

  const freeTrialActiveTemplate = `
    <h1 style="margin-left:0px;margin-right:0px;margin-top:1.75rem;margin-bottom:1.75rem;padding:0px;text-align:center;font-size:1.25rem;line-height:1.75rem;font-weight:600;color:rgb(0,0,0)">
      Welcome to Echo Chat!
    </h1>
    <p style="font-size:0.875rem;line-height:1.5rem;margin:16px 0;margin-left:auto;margin-right:auto">
      Hi ${options.username}, your free trial is now active. You can create temporary chatrooms with features like:
    </p>
    <ul style="font-size:0.875rem;line-height:1.5rem;margin:16px 0;margin-left:2rem;list-style-type:disc">
      <li>Self-destructing messages</li>
      <li>End-to-end encrypted chats</li>
      <li>No registration required for participants</li>
      <li>Custom room expiry times</li>
    </ul>
    <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="margin-top:2rem;margin-bottom:2rem">
      <tbody>
        <tr>
          <td>
            <div style="margin-left:auto;margin-right:auto;width:fit-content;text-align:center">
              <a href="${options.dashboardLink}" style="display:inline-block;background-color:rgb(0,0,0);color:rgb(255,255,255);text-decoration:none;padding:0.75rem 1.5rem;border-radius:0.375rem;font-size:0.875rem;font-weight:500">
                Create Your First Room
              </a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <p style="font-size:0.875rem;line-height:1.5rem;margin:16px 0;text-align:center;color:rgb(107,114,128)">
      Your chatrooms will automatically expire after the set duration, ensuring your conversations stay private.
    </p>
    <hr style="width:100%;border:none;border-top:1px solid #eaeaea;margin-left:0px;margin-right:0px;margin-top:1.5rem;margin-bottom:1.5rem;border-width:1px;border-color:rgb(229,231,235)">
    <p style="font-size:12px;line-height:1.5rem;margin:16px 0;color:rgb(107,114,128)">
      Having trouble setting up a room? <a href="mailto:echochat.com@gmail.com" style="color:rgb(37,99,235);text-decoration:none">Contact us</a> for immediate assistance.
    </p>
  `

  switch (options.tag) {
    case 'verify-email':
      return baseTemplate(verifyEmailTemplate)
    case 'password_reset':
      return baseTemplate(passwordResetTemplate)
    case 'subscription_active':
      return baseTemplate(subscriptionActiveTemplate)
    case 'free_trial_active':
      return baseTemplate(freeTrialActiveTemplate)
    default:
      return baseTemplate(options.message || '')
  }
}
