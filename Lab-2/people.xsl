<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:template match="/">
        <html>
        <head>
            <title>Список людей</title>
            <style>
                body { font-family: Arial, sans-serif; }
                table { width: 50%; border-collapse: collapse; margin: 20px 0; }
                th, td { border: 1px solid black; padding: 8px; text-align: left; }
                th { background-color: #f2f2f2; }
            </style>
        </head>
        <body>
            <h2>Список людей</h2>
            <table>
                <tr>
                    <th>Ім'я</th>
                    <th>Вік</th>
                    <th>Зріст</th>
                    <th>Вага</th>
                </tr>

                <xsl:for-each select="people/person">
                    <tr>
                        <td><xsl:value-of select="name"/></td>
                        <td><xsl:value-of select="age"/></td>
                        <td><xsl:value-of select="height"/></td>
                        <td><xsl:value-of select="weight"/></td>
                    </tr>
                </xsl:for-each>

            </table>
        </body>
        </html>
    </xsl:template>

</xsl:stylesheet>