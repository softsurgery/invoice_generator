import { observer } from "mobx-react"
import settings from "../data/settingsStore"

const Footer = observer(() => {
    return (
        <footer
            className="page-footer text-center text-md-left pt-4"
            style={{ opacity: settings.getDev() ? "" : "0" }}>
            <div className="footer text-center">
                <div className="container-fluid">
                    <a href="https://github.com/softsurgery" target="_blank"> @softsurgery </a> {new Date().getFullYear()}
                    <br />
                    <strong className="p-2" style={{ marginLeft: "10px", color: "#1672fd", fontSize: "12px" }}>{settings.getUserToken()}</strong>
                </div>
            </div>
        </footer>
    )
})

export default Footer