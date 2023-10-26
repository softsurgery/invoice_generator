import sys    
from PyQt5 import QtCore, QtWidgets, QtWebEngineWidgets

def download_invoice(url,savedcopy):
    app = QtWidgets.QApplication(sys.argv) 
    loader = QtWebEngineWidgets.QWebEngineView() 
    loader.setZoomFactor(1) 
    loader.page().pdfPrintingFinished.connect( 
        lambda *args: print('finished:', args)) 
    loader.load(QtCore.QUrl(url))

    def emit_pdf(finished): 
        loader.show() 
        loader.page().printToPdf(f"{savedcopy}.pdf")

    loader.loadFinished.connect(emit_pdf)
    app.exec()
