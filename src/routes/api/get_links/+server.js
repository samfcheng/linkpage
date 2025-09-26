import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { json } from '@sveltejs/kit';

import { GOOGLE_API_KEY } from '$env/static/private'
import { GOOGLE_EMAIL } from '$env/static/private'

export async function GET({ url }) {
  const spreadsheetId = url.searchParams.get('id')

  const auth = new JWT({
    email: GOOGLE_EMAIL,
    key: GOOGLE_API_KEY.split(String.raw`\n`).join('\n'),
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets',
      // note that sharing-related calls require the google drive scope
      'https://www.googleapis.com/auth/drive.file',
    ],
  });

  const doc = new GoogleSpreadsheet(spreadsheetId, auth);
  await doc.loadInfo();

  const info_sheet = doc.sheetsByIndex[0];
  const links_sheet = doc.sheetsByIndex[1];

  const info = await info_sheet.getRows();
  const info_row = info[0]
  const links = await links_sheet.getRows();

  let links_list = [];

  for (let i = 0; i < links.length; i++) {
    let link = links[i]
    links_list.push({
      title: link.get('Link Title'),
      icon: link.get('Icon'),
      url: link.get('Link URL'),
    })
  }

  return json({
    first_name: info_row.get('First Name'),
    last_name: info_row.get('Last Name'),
    tagline: info_row.get('Tagline'),
    avatar: info_row.get('Profile Picture'),
    links_list
  })
}