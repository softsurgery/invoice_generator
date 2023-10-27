from pyppeteer import launch

async def generate_pdf(url, pdf_path):
    browser = await launch(
        handleSIGINT=False,
        handleSIGTERM=False,
        handleSIGHUP=False
    )
    
    page = await browser.newPage()
    
    await page.goto(url)
    
    await page.pdf({
        'path': pdf_path,
        'format': 'A4'
    })
    
    await browser.close()


