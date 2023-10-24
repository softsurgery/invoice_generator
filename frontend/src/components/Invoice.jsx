import { useState } from 'react'

function Invoice() {

    return (
        <div class="container">
            <div class="invoice">
                <div class="row">
                    <div class="col-7">
                        <img src="http://mysam.fr/wp-content/uploads/2016/06/logo_facture.jpg" class="logo" />
                    </div>
                    <div class="col-5">
                        <h1 class="document-type display-4">FACTURE</h1>
                        <p class="text-right"><strong th: text="${invoiceReference}">Référence facture</strong></p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-7">
                        <p class="addressMySam">
                            <strong>MYSAM</strong><br />
                            8 avenue de la Martelle<br />
                            81150 Terssac
                        </p>
                    </div>
                    <div class="col-5">
                        <br /><br /><br />
                        <p class="addressDriver">
                            <strong th: text="${driver.getCompanyName()}">Société VTC</strong><br />
                            Réf. Client <em th: text="${driver.getUserId()}">Référence client</em><br />
                            <span th: text="${driver.getFirstName()}">Prénom</span> <span
                                th: text="${driver.getLastName()}">NOM</span><br />
                            <span th: text="${driver.getAddress()}">adresse</span><br />
                            <span th: text="${driver.getZipCode()}">code postal</span> <span
                                th: text="${driver.getCity()}">VILLE</span>
                        </p>
                    </div>
                </div>
                <br />
                <br />
                <h6>Frais de services MYSAM du <span th: text="${start}">date</span> au <span th: text="${end}">date</span>
                </h6>
                <br />
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Quantité</th>
                            <th>Unité</th>
                            <th>PU TTC</th>
                            <th>TVA</th>
                            <th class="text-right">Total HT</th>
                            <th class="text-right">Total TTC</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Frais de service MySam à 5% pour la période du <span th: text="${start}">date</span> au <span
                                th: text="${end}">date</span></td>
                            <td>13</td>
                            <td>Kilomètres</td>
                            <td class="text-right">1,20€</td>
                            <td>20%</td>
                            <td class="text-right" th: text="${summaryDriverClientsPayment.get('mysamHT')}">0,00€</td>
                            <td class="text-right" th: text="${summaryDriverClientsPayment.get('mysamTTC')}">0,00€</td>
                        </tr>
                        <tr>
                            <td>Frais de service MySam à 10% pour la période du <span th: text="${start}">date</span> au <span
                                th: text="${end}">date</span></td>
                            <td>15</td>
                            <td>Minutes</td>
                            <td class="text-right">0,25€</td>
                            <td>20%</td>
                            <td class="text-right" th: text="${summaryDriverPayment.get('mysamHT')}">0,00€</td>
                            <td class="text-right" th: text="${summaryDriverPayment.get('mysamTTC')}">0,00€</td>
                        </tr>
                        <tr>
                            <td>Pénalités d'annulation</td>
                            <td>5</td>
                            <td>Minutes</td>
                            <td class="text-right">-10€</td>
                            <td>20%</td>
                            <td class="text-right" th: text="${summaryPenalties.get('driverHT')}">0,00€</td>
                            <td class="text-right" th: text="${summaryPenalties.get('driverTTC')}">0,00€</td>
                        </tr>
                    </tbody>
                </table>
                <div class="row">
                    <div class="col-8">
                    </div>
                    <div class="col-4">
                        <table class="table table-sm text-right">
                            <tr>
                                <td><strong>Total HT</strong></td>
                                <td class="text-right" th: text="${totalHT}">0,00€</td>
                            </tr>
                            <tr>
                                <td>TVA 20%</td>
                                <td class="text-right" th: text="${totalTVA}">0,00€</td>
                            </tr>
                            <tr>
                                <td><strong>Total TTC</strong></td>
                                <td class="text-right" th: text="${totalTTC}">0,00€</td>
                            </tr>
                        </table>
                    </div>
                </div>

                <p class="conditions">
                    En votre aimable règlement
                    <br />
                    Et avec nos remerciements.
                    <br /><br />
                    Conditions de paiement : paiement à réception de facture.
                    <br />
                    Aucun escompte consenti pour règlement anticipé.
                    <br />
                    Règlement par virement bancaire ou carte bancaire.
                    <br /><br />
                    En cas de retard de paiement, indemnité forfaitaire pour frais de recouvrement : 40 euros (art. L.4413
                    et
                    L.4416 code du commerce).
                </p>

                <br />
                <br />
                <br />
                <br />

                <p class="bottom-page text-right">
                    MYSAM SAS - N° SIRET 81754802700017 RCS ALBI<br />
                    8, avenue de la Martelle - 81150 TERSSAC 06 32 97 00 22 - www.mysam.fr<br />
                    Code APE 6312Z - N° TVA Intracom. FR 63 817548027<br />
                    IBAN FR76 1470 7034 0031 4211 7882 825 - SWIFT CCBPFRPPMTZ
                </p>
            </div>
        </div>
)
}
export default Invoice
