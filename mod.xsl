<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:oxm="https://www.openxsl.com">

    <xsl:template match="/root" name="wurui.mystock">
        <xsl:param name="link_add"/>
        <xsl:param name="qs">symbol</xsl:param>
        <!-- className 'J_OXMod' required  -->
        <div class="J_OXMod oxmod-mystock" ox-mod="mystock" data-qs="{$qs}">

            <xsl:choose>
                <xsl:when test="count(data/user-rel/i/rel/i) &gt; 0">
                    <table cellpadding="0" cellspacing="0" class="maintable">

                        <tbody>
                            <xsl:for-each select="data/user-rel/i/rel/i">
                                <tr data-href="{normalize-space(.)}" data-symbol="{normalize-space(.)}">
                                    <td><xsl:value-of select="."/></td>
                                    <td>
                                        <span class="J_close"></span>
                                    </td>
                                    <td align="right">
                                        <span class="J_med"></span>
                                        <span class="J_percent">...</span>
                                    </td>
                                </tr>
                            </xsl:for-each>
                        </tbody>
                    </table>
                </xsl:when>
                <xsl:otherwise>
                    <a href="{$link_add}">+ add </a>
                </xsl:otherwise>
            </xsl:choose>
        </div>
    </xsl:template>

</xsl:stylesheet>
