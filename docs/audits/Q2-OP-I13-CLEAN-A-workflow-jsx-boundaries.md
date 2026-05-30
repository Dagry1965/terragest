# Q2-OP-I13-CLEAN-A — Audit bornes JSX du bloc workflow

Objectif : identifier les bornes exactes du bloc workflow dans `ERPEnterpriseForm` sans modifier le fichier.

## Marker: workflowCondition

Pattern: `{mode === "edit" && !isRemovedRecord && workflowActions.length > 0 && (`

Occurrences: 1

- Line 1821

## Marker: workflowMap

Pattern: `workflowActions.map`

Occurrences: 1

- Line 1833

## Marker: pendingRefSet

Pattern: `pendingWorkflowActionRef.current = action`

Occurrences: 1

- Line 1838

## Marker: requestSubmit

Pattern: `formRef.current?.requestSubmit()`

Occurrences: 1

- Line 1839

## Marker: workflowTitle

Pattern: `Workflow`

Occurrences: 7

- Line 413
- Line 1182
- Line 1273
- Line 1413
- Line 1455
- Line 1825
- Line 1838

## Marker: afterActionsWrapper

Pattern: `<div className="flex flex-col`

Occurrences: 1

- Line 2012

## Marker: summaryPanel

Pattern: `<ERPFormSummaryPanel module={module} />`

Occurrences: 1

- Line 2141

## Bloc workflow équilibré détecté

- Start line: 1821
- End line: 2087
- Contains workflowActions.map: yes
- Contains pending ref set: yes
- Contains requestSubmit: yes

### Contexte bloc workflow complet

```tsx
 1813:             vehiculeId={initialData.vehiculeId ? String(initialData.vehiculeId) : undefined}
 1814:             montantTTC={Number(initialData.montantTTC ?? 0)}
 1815:             montantPaye={Number(initialData.montantPaye ?? 0)}
 1816:             resteAPayer={Number(initialData.resteAPayer ?? 0)}
 1817:           />
 1818:         </div>
 1819:       ) : null}
 1820: 
 1821:       {mode === "edit" && !isRemovedRecord && workflowActions.length > 0 && (
 1822:         <section className="rounded-2xl sm:rounded-3xl border border-[#D5E4E8] bg-[#F8FAFC] p-4 shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
 1823:           <div className="mb-3">
 1824:             <p className="text-xs font-black uppercase tracking-wide text-[#334155]">
 1825:               Workflow
 1826:             </p>
 1827:             <p className="text-sm text-[#111827]">
 1828:               Ces actions enregistrent d'abord le formulaire, puis executent le workflow.low.
 1829:             </p>
 1830:           </div>
 1831: 
 1832:           <div className="flex flex-wrap gap-3">
 1833:             {workflowActions.map((action) => (
 1834:               <button
 1835:                 key={action.key}
 1836:                 type="button"
 1837:                 onClick={() => {
 1838:                   pendingWorkflowActionRef.current = action;
 1839:                   formRef.current?.requestSubmit();
 1840:                 }}
 1841:                 className={`
 1842:                   rounded-2xl
 1843:                   px-4
 1844:                   py-2
 1845:                   text-sm
 1846:                   font-bold
 1847:                   transition
 1848:                   ${
 1849:                     action.type === "danger"
 1850:                       ? "bg-red-600 text-[var(--erp-text)] hover:bg-red-700"
 1851:                       : action.type === "secondary"
 1852:                         ? "bg-slate-200 text-[var(--erp-text)] hover:bg-slate-300"
 1853:                         : "bg-[var(--erp-surface)] text-[var(--erp-text)] hover:bg-[#1F2937] hover:border-[#00A68A]"
 1854:                   }
 1855:                 `}
 1856:               >
 1857:                 {action.label}
 1858:               </button>
 1859:             ))}
 1860:           </div>
 1861:         </section>
 1862:       )}
 1863:       <section className="overflow-hidden rounded-2xl sm:rounded-3xl border border-[var(--erp-border)] bg-[var(--erp-surface)] shadow-sm">
 1864:         <div className="bg-gradient-to-r from-white via-white to-[var(--erp-primary-soft)] px-8 py-8 text-[var(--erp-text)]">
 1865:           <p className="text-sm font-bold uppercase tracking-wide text-[#475569]">
 1866:             {mode === "create"
 1867:               ? "Creation"
 1868:               : "Modification"}
 1869:           </p>
 1870: 
 1871:           <h1 className="mt-3 text-4xl font-black tracking-tight">
 1872:             {module.metadata.label}
 1873:           </h1>
 1874: 
 1875:           <p className="mt-3 max-w-3xl text-base leading-7 text-slate-300">
 1876:             Formulaire metier connecte au binding runtime.
 1877:           </p>
 1878:         </div>
 1879:       </section>
 1880: 
 1881:       <section className="grid gap-8 xl:grid-cols-[1fr_360px]">
 1882:         <div className="space-y-6">
 1883:           {module.form?.layout === "tabs" ? (
 1884:             <ERPFormTabs
 1885:               module={module}
 1886:               initialData={formValues}
 1887:               formValues={formValues}
 1888:               onFieldChange={handleFieldChange}
 1889:               fieldErrors={errorByField}
 1890:               lockedFields={lockedFields}
 1891:               readOnlyFields={readOnlyFields}
 1892:             />
 1893:           ) : (
 1894:             <>
 1895:               <ERPFormSection
 1896:                 title="Informations principales"
 1897:                 description="Renseigne les champs principaux du module."
 1898:               >
 1899:                 {mainFields.map((field) => (
 1900:                   <ERPFormField
 1901:                     key={field.key}
 1902:                     field={field}
 1903:                     value={formValues[field.key]}
 1904:                     formValues={formValues}
 1905:                     onChange={handleFieldChange}
 1906:                     error={errorByField[field.key]}
 1907:                     lockedFields={lockedFields}
 1908:                       readOnlyFields={readOnlyFields}
 1909:                   />
 1910:                 ))}
 1911:               </ERPFormSection>
 1912: 
 1913:               {relationFields.length > 0 && (
 1914:                 <ERPFormSection
 1915:                   title="Relations"
 1916:                   description="Associe cet element aux autres objets metier."
 1917:                 >
 1918:                   {relationFields.map((field) => (
 1919:                     <ERPFormField
 1920:                       key={field.key}
 1921:                       field={field}
 1922:                       value={formValues[field.key]}
 1923:                       formValues={formValues}
 1924:                     onChange={handleFieldChange}
 1925:                       error={errorByField[field.key]}
 1926:                       lockedFields={lockedFields}
 1927:                       readOnlyFields={readOnlyFields}
 1928:                     />
 1929:                   ))}
 1930:                 </ERPFormSection>
 1931:               )}
 1932:             </>
 1933:           )}
 1934: <div className="flex flex-wrap gap-3 rounded-2xl sm:rounded-3xl border border-[var(--erp-border)] bg-[var(--erp-surface)] p-5 shadow-sm">
 1935:             {isStatusActionOnly && (
 1936:           <div
 1937:             className="
 1938:               rounded-2xl
 1939:               border
 1940:               border-slate-200
 1941:               bg-slate-50
 1942:               px-5
 1943:               py-3
 1944:               text-sm
 1945:               text-slate-700
 1946:               shadow-sm
 1947:             "
 1948:           >
 1949:             <span className="font-semibold text-slate-900">
 1950:               Statut pilote par les actions.
 1951:             </span>{" "}
 1952:             Le statut indique l'etat metier de la fiche. Pour changer cet etat,
 1953:             utilisez les boutons d'action prevus par le systeme.
 1954:           </div>
 1955:         )}
 1956: 
 1957:         {statusGuidance && (
 1958:           <div
 1959:             className={[
 1960:               "rounded-2xl border px-5 py-4 text-sm shadow-sm",
 1961:               statusGuidanceToneClass,
 1962:             ].join(" ")}
 1963:           >
 1964:             <div className="font-semibold">
 1965:               {statusGuidance.title}
 1966:             </div>
 1967:             <p
 1968:               className={[
 1969:                 "mt-1 leading-6",
 1970:                 statusGuidanceMessageClass,
 1971:               ].join(" ")}
 1972:             >
 1973:               {statusGuidance.message}
 1974:             </p>
 1975:           </div>
 1976:         )}
 1977: 
 1978:         {errors.length > 0 && (
 1979:               <div className="w-full rounded-2xl sm:rounded-3xl border border-red-200 bg-red-50 p-5">
 1980:                 <h3 className="text-sm font-black text-red-700">
 1981:                   Validation metier
 1982:                 </h3>
 1983: 
 1984:                 <div className="mt-3 space-y-2">
 1985:                   {errors.map((error, index) => (
 1986:                     <div
 1987:                       key={index}
 1988:                       className="text-sm text-red-600"
 1989:                     >
 1990:                       - {error.field} : {error.message}
 1991:                     </div>
 1992:                   ))}
 1993:                 </div>
 1994:               </div>
 1995:             )}
 1996: 
 1997:             {businessStatusAction ? (
 1998: 
 1999: 
 2000:               <div
 2001: 
 2002: 
 2003:                 data-business-status-actions
 2004: 
 2005: 
 2006:                 className="w-full rounded-2xl sm:rounded-3xl border border-amber-200 bg-amber-50 p-5"
 2007: 
 2008: 
 2009:               >
 2010: 
 2011: 
 2012:                 <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
 2013: 
 2014: 
 2015:                   <div>
 2016: 
 2017: 
 2018:                     <p className="text-xs font-black uppercase tracking-wide text-amber-700">
 2019: 
 2020: 
 2021:                       Action metier
 2022: 
 2023: 
 2024:                     </p>
 2025: 
 2026: 
 2027:             
 2028: 
 2029: 
 2030:                     <h3 className="mt-1 text-xl font-black text-[var(--erp-text)]">
 2031: 
 2032: 
 2033:                       {businessStatusAction.label}
 2034: 
 2035: 
 2036:                     </h3>
 2037: 
 2038: 
 2039:             
 2040: 
 2041: 
 2042:                     <p className="mt-2 text-sm leading-6 text-[var(--erp-text-muted)]">
 2043: 
 2044: 
 2045:                       Cette action conserve l'historique et evite une suppression brutale.
 2046: 
 2047: 
 2048:                     </p>
 2049: 
 2050: 
 2051:                   </div>
 2052: 
 2053: 
 2054:             
 2055: 
 2056: 
 2057:                   <button
 2058: 
 2059: 
 2060:                     type="button"
 2061: 
 2062: 
 2063:                     disabled={saving}
 2064: 
 2065: 
 2066:                     onClick={handleBusinessStatusAction}
 2067: 
 2068: 
 2069:                     className="inline-flex items-center justify-center rounded-2xl bg-amber-600 px-5 py-3 text-sm font-black text-[var(--erp-text)] shadow-sm transition hover:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-60"
 2070: 
 2071: 
 2072:                   >
 2073: 
 2074: 
 2075:                     {businessStatusAction.label}
 2076: 
 2077: 
 2078:                   </button>
 2079: 
 2080: 
 2081:                 </div>
 2082: 
 2083: 
 2084:               </div>
 2085: 
 2086: 
 2087:             ) : null}
 2088: 
 2089: 
 2090: 
 2091:             {!isRemovedRecord ? (
 2092:               <>
 2093:                 <ERPButton
 2094:                   type="submit"
 2095:                   disabled={saving}
```

## Contexte fin de formulaire

```tsx
 1801:           <InvoicePaymentsHistory
 1802:             factureId={String(initialData.id ?? initialData._id ?? "")}
 1803:             montantTTC={Number(initialData.montantTTC ?? 0)}
 1804:           />
 1805:         </div>
 1806:       ) : null}
 1807: 
 1808:       {isInvoiceEditForm ? (
 1809:         <div data-invoice-payment-schedule>
 1810:           <InvoicePaymentSchedule
 1811:             factureId={String(initialData.id ?? initialData._id ?? "")}
 1812:             clientId={initialData.clientId ? String(initialData.clientId) : undefined}
 1813:             vehiculeId={initialData.vehiculeId ? String(initialData.vehiculeId) : undefined}
 1814:             montantTTC={Number(initialData.montantTTC ?? 0)}
 1815:             montantPaye={Number(initialData.montantPaye ?? 0)}
 1816:             resteAPayer={Number(initialData.resteAPayer ?? 0)}
 1817:           />
 1818:         </div>
 1819:       ) : null}
 1820: 
 1821:       {mode === "edit" && !isRemovedRecord && workflowActions.length > 0 && (
 1822:         <section className="rounded-2xl sm:rounded-3xl border border-[#D5E4E8] bg-[#F8FAFC] p-4 shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
 1823:           <div className="mb-3">
 1824:             <p className="text-xs font-black uppercase tracking-wide text-[#334155]">
 1825:               Workflow
 1826:             </p>
 1827:             <p className="text-sm text-[#111827]">
 1828:               Ces actions enregistrent d'abord le formulaire, puis executent le workflow.low.
 1829:             </p>
 1830:           </div>
 1831: 
 1832:           <div className="flex flex-wrap gap-3">
 1833:             {workflowActions.map((action) => (
 1834:               <button
 1835:                 key={action.key}
 1836:                 type="button"
 1837:                 onClick={() => {
 1838:                   pendingWorkflowActionRef.current = action;
 1839:                   formRef.current?.requestSubmit();
 1840:                 }}
 1841:                 className={`
 1842:                   rounded-2xl
 1843:                   px-4
 1844:                   py-2
 1845:                   text-sm
 1846:                   font-bold
 1847:                   transition
 1848:                   ${
 1849:                     action.type === "danger"
 1850:                       ? "bg-red-600 text-[var(--erp-text)] hover:bg-red-700"
 1851:                       : action.type === "secondary"
 1852:                         ? "bg-slate-200 text-[var(--erp-text)] hover:bg-slate-300"
 1853:                         : "bg-[var(--erp-surface)] text-[var(--erp-text)] hover:bg-[#1F2937] hover:border-[#00A68A]"
 1854:                   }
 1855:                 `}
 1856:               >
 1857:                 {action.label}
 1858:               </button>
 1859:             ))}
 1860:           </div>
 1861:         </section>
 1862:       )}
 1863:       <section className="overflow-hidden rounded-2xl sm:rounded-3xl border border-[var(--erp-border)] bg-[var(--erp-surface)] shadow-sm">
 1864:         <div className="bg-gradient-to-r from-white via-white to-[var(--erp-primary-soft)] px-8 py-8 text-[var(--erp-text)]">
 1865:           <p className="text-sm font-bold uppercase tracking-wide text-[#475569]">
 1866:             {mode === "create"
 1867:               ? "Creation"
 1868:               : "Modification"}
 1869:           </p>
 1870: 
 1871:           <h1 className="mt-3 text-4xl font-black tracking-tight">
 1872:             {module.metadata.label}
 1873:           </h1>
 1874: 
 1875:           <p className="mt-3 max-w-3xl text-base leading-7 text-slate-300">
 1876:             Formulaire metier connecte au binding runtime.
 1877:           </p>
 1878:         </div>
 1879:       </section>
 1880: 
 1881:       <section className="grid gap-8 xl:grid-cols-[1fr_360px]">
 1882:         <div className="space-y-6">
 1883:           {module.form?.layout === "tabs" ? (
 1884:             <ERPFormTabs
 1885:               module={module}
 1886:               initialData={formValues}
 1887:               formValues={formValues}
 1888:               onFieldChange={handleFieldChange}
 1889:               fieldErrors={errorByField}
 1890:               lockedFields={lockedFields}
 1891:               readOnlyFields={readOnlyFields}
 1892:             />
 1893:           ) : (
 1894:             <>
 1895:               <ERPFormSection
 1896:                 title="Informations principales"
 1897:                 description="Renseigne les champs principaux du module."
 1898:               >
 1899:                 {mainFields.map((field) => (
 1900:                   <ERPFormField
 1901:                     key={field.key}
 1902:                     field={field}
 1903:                     value={formValues[field.key]}
 1904:                     formValues={formValues}
 1905:                     onChange={handleFieldChange}
 1906:                     error={errorByField[field.key]}
 1907:                     lockedFields={lockedFields}
 1908:                       readOnlyFields={readOnlyFields}
 1909:                   />
 1910:                 ))}
 1911:               </ERPFormSection>
 1912: 
 1913:               {relationFields.length > 0 && (
 1914:                 <ERPFormSection
 1915:                   title="Relations"
 1916:                   description="Associe cet element aux autres objets metier."
 1917:                 >
 1918:                   {relationFields.map((field) => (
 1919:                     <ERPFormField
 1920:                       key={field.key}
 1921:                       field={field}
 1922:                       value={formValues[field.key]}
 1923:                       formValues={formValues}
 1924:                     onChange={handleFieldChange}
 1925:                       error={errorByField[field.key]}
 1926:                       lockedFields={lockedFields}
 1927:                       readOnlyFields={readOnlyFields}
 1928:                     />
 1929:                   ))}
 1930:                 </ERPFormSection>
 1931:               )}
 1932:             </>
 1933:           )}
 1934: <div className="flex flex-wrap gap-3 rounded-2xl sm:rounded-3xl border border-[var(--erp-border)] bg-[var(--erp-surface)] p-5 shadow-sm">
 1935:             {isStatusActionOnly && (
 1936:           <div
 1937:             className="
 1938:               rounded-2xl
 1939:               border
 1940:               border-slate-200
 1941:               bg-slate-50
 1942:               px-5
 1943:               py-3
 1944:               text-sm
 1945:               text-slate-700
 1946:               shadow-sm
 1947:             "
 1948:           >
 1949:             <span className="font-semibold text-slate-900">
 1950:               Statut pilote par les actions.
 1951:             </span>{" "}
 1952:             Le statut indique l'etat metier de la fiche. Pour changer cet etat,
 1953:             utilisez les boutons d'action prevus par le systeme.
 1954:           </div>
 1955:         )}
 1956: 
 1957:         {statusGuidance && (
 1958:           <div
 1959:             className={[
 1960:               "rounded-2xl border px-5 py-4 text-sm shadow-sm",
 1961:               statusGuidanceToneClass,
 1962:             ].join(" ")}
 1963:           >
 1964:             <div className="font-semibold">
 1965:               {statusGuidance.title}
 1966:             </div>
 1967:             <p
 1968:               className={[
 1969:                 "mt-1 leading-6",
 1970:                 statusGuidanceMessageClass,
 1971:               ].join(" ")}
 1972:             >
 1973:               {statusGuidance.message}
 1974:             </p>
 1975:           </div>
 1976:         )}
 1977: 
 1978:         {errors.length > 0 && (
 1979:               <div className="w-full rounded-2xl sm:rounded-3xl border border-red-200 bg-red-50 p-5">
 1980:                 <h3 className="text-sm font-black text-red-700">
 1981:                   Validation metier
 1982:                 </h3>
 1983: 
 1984:                 <div className="mt-3 space-y-2">
 1985:                   {errors.map((error, index) => (
 1986:                     <div
 1987:                       key={index}
 1988:                       className="text-sm text-red-600"
 1989:                     >
 1990:                       - {error.field} : {error.message}
 1991:                     </div>
 1992:                   ))}
 1993:                 </div>
 1994:               </div>
 1995:             )}
 1996: 
 1997:             {businessStatusAction ? (
 1998: 
 1999: 
 2000:               <div
 2001: 
 2002: 
 2003:                 data-business-status-actions
 2004: 
 2005: 
 2006:                 className="w-full rounded-2xl sm:rounded-3xl border border-amber-200 bg-amber-50 p-5"
 2007: 
 2008: 
 2009:               >
 2010: 
 2011: 
 2012:                 <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
 2013: 
 2014: 
 2015:                   <div>
 2016: 
 2017: 
 2018:                     <p className="text-xs font-black uppercase tracking-wide text-amber-700">
 2019: 
 2020: 
 2021:                       Action metier
 2022: 
 2023: 
 2024:                     </p>
 2025: 
 2026: 
 2027:             
 2028: 
 2029: 
 2030:                     <h3 className="mt-1 text-xl font-black text-[var(--erp-text)]">
 2031: 
 2032: 
 2033:                       {businessStatusAction.label}
 2034: 
 2035: 
 2036:                     </h3>
 2037: 
 2038: 
 2039:             
 2040: 
 2041: 
 2042:                     <p className="mt-2 text-sm leading-6 text-[var(--erp-text-muted)]">
 2043: 
 2044: 
 2045:                       Cette action conserve l'historique et evite une suppression brutale.
 2046: 
 2047: 
 2048:                     </p>
 2049: 
 2050: 
 2051:                   </div>
 2052: 
 2053: 
 2054:             
 2055: 
 2056: 
 2057:                   <button
 2058: 
 2059: 
 2060:                     type="button"
 2061: 
 2062: 
 2063:                     disabled={saving}
 2064: 
 2065: 
 2066:                     onClick={handleBusinessStatusAction}
 2067: 
 2068: 
 2069:                     className="inline-flex items-center justify-center rounded-2xl bg-amber-600 px-5 py-3 text-sm font-black text-[var(--erp-text)] shadow-sm transition hover:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-60"
 2070: 
 2071: 
 2072:                   >
 2073: 
 2074: 
 2075:                     {businessStatusAction.label}
 2076: 
 2077: 
 2078:                   </button>
 2079: 
 2080: 
 2081:                 </div>
 2082: 
 2083: 
 2084:               </div>
 2085: 
 2086: 
 2087:             ) : null}
 2088: 
 2089: 
 2090: 
 2091:             {!isRemovedRecord ? (
 2092:               <>
 2093:                 <ERPButton
 2094:                   type="submit"
 2095:                   disabled={saving}
 2096:                 >
 2097:                   {saving
 2098:                     ? "Enregistrement..."
 2099:                     : "Enregistrer"}
 2100:                 </ERPButton>
 2101: 
 2102:                 <ERPButton
 2103:                   variant="secondary"
 2104:                   type="button"
 2105:                   disabled={saving}
 2106:                   onClick={() =>
 2107:                     router.push(
 2108:                       returnTo ??
 2109:                         module.metadata.routes?.list ??
 2110:                         `/${module.metadata.key}`
 2111:                     )
 2112:                   }
 2113:                 >
 2114:                   Annuler
 2115:                 </ERPButton>
 2116:               </>
 2117:             ) : null}
 2118: 
 2119:                         {mode === "edit" && Boolean(initialData?.id) && sensitiveBusinessModule ? (
 2120:               <div
 2121:                 data-sensitive-delete-hidden-notice
 2122:                 className="w-full rounded-2xl border border-[var(--erp-border-strong)] bg-[var(--erp-primary-soft)] px-4 py-3 text-sm text-[var(--erp-text-muted)]"
 2123:               >
 2124:                 Suppression masquee pour preserver l'historique. Utilisez l'action metier adaptee, comme "Retirer la ligne", afin que le stock, les totaux et la tracabilite soient corriges proprement.
 2125:               </div>
 2126:             ) : null}
 2127: 
 2128: {mode === "edit" && Boolean(initialData?.id) && !sensitiveBusinessModule ? (
 2129:               <ERPButton
 2130:                 type="button"
 2131:                 variant="danger"
 2132:                 disabled={saving || isRemovedRecord}
 2133:                 onClick={handleDeleteRecord}
 2134:               >
 2135:                 Supprimer
 2136:               </ERPButton>
 2137:             ) : null}
 2138:           </div>
 2139:         </div>
 2140: 
 2141:         <ERPFormSummaryPanel module={module} />
 2142:       </section>
 2143:     </form>
 2144:   );
 2145: }
 2146: 
```

## Décision recommandée

- Le bloc workflow visuel est précisément détecté et équilibré.
- Prochaine passe possible : remplacer uniquement les lignes du bloc détecté par `null`, sans toucher aux wrappers voisins.