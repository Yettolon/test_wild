import requests


def get_products_wb(min_price=623, max_price=5000, pages=4):
    url = "https://search.wb.ru/exactmatch/ru/common/v13/search"
    headers = {"User-Agent": "Mozilla/5.0"}

    results = []

    for page in range(1, pages + 1):
        params = {
            "appType": 1,
            "curr": "rub",
            "dest": -1257786,
            "page": page,
            "priceU": f"{min_price * 100};{max_price * 100}",  # в копейках
            "fbrand": "61",  # ASICS
            "query": "Кроссовки",
            "sort": "popular",
            "resultset": "catalog",
        }

        response = requests.get(url, headers=headers, params=params)

        if response.status_code == 200:
            data = response.json()
            products = data.get("data", {}).get("products", [])

            for product in products:
                name = product.get("name", "Без названия")
                nm_id = product.get("id")
                link = (
                    f"https://www.wildberries.ru/catalog/{nm_id}/detail.aspx"
                    if nm_id
                    else None
                )

                sizes = product.get("sizes", [])
                prices = [
                    size.get("price", {}).get("total", 0)
                    for size in sizes
                    if size.get("price", {}).get("total", 0) > 0
                ]

                min_price_found = min(prices) / 100 if prices else None

                results.append(
                    {
                        "name": name,
                        "min_price": min_price_found,
                        "link": link,
                    }
                )
        else:
            raise Exception(
                f"WB API error: status {response.status_code} on page {page}"
            )

    return results
