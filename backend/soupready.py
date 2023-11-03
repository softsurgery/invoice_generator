from bs4 import BeautifulSoup

def change_image_src(html_file_path, image_id, new_src):
    try:
        with open(html_file_path, 'r', encoding='utf-8') as file:
            html_content = file.read()
        soup = BeautifulSoup(html_content, 'html.parser')
        image_tag = soup.find(id=image_id)

        if image_tag:
            image_tag['src'] = new_src
            with open(html_file_path, 'w', encoding='utf-8') as file:
                file.write(soup.prettify())
            return True
        else:
            return False
    except Exception as e:
        return False


def modify_html_with_dicts(html_file_path, modifications):
    try:
        with open(html_file_path, 'r', encoding='utf-8') as file:
            html_content = file.read()
        soup = BeautifulSoup(html_content, 'html.parser')

        for modification in modifications:
            id_value = modification.get('id')
            new_inner_text = modification.get('new_inner_text')

            if id_value:
                tag = soup.find('span', id=id_value)
                if tag:
                    tag.string = new_inner_text
                    with open(html_file_path, 'w', encoding='utf-8') as file:
                        file.write(soup.prettify())
        return True
    except Exception as e:
        return False


def fill_tbody_with_data(html_file_path, tbody_id, data):
        with open(html_file_path, 'r', encoding='utf-8') as file:
            html_content = file.read()
        soup = BeautifulSoup(html_content, 'html.parser')
        tbody = soup.find('tbody', id=tbody_id)
        if tbody:
            tbody.clear()
            with open(html_file_path, 'w', encoding='utf-8') as file:
                file.write(soup.prettify())
            try:
                for item in data:
                    tr = soup.new_tag('tr')
                    for key in ['description', 'quantity', 'rate',"amount"]:
                        td = soup.new_tag('td')
                        if key == 'description':
                            td.string = item.get(key,'')
                            td['style'] = 'width:65%' 
                        elif key == 'quantity':
                            td.string = item.get(key, '')
                        elif key == 'rate':
                            td.string = item.get(key, '')
                            td['class'] = 'text-right'
                        else:
                            rate = float(item.get('rate', 0))
                            quantity = float(item.get('quantity', 1))
                            td.string = str(rate * quantity)
                            td['class'] = 'text-right'
                        tr.append(td)
                    tbody.append(tr)
                    with open(html_file_path, 'w', encoding='utf-8') as file:
                        file.write(soup.prettify())
                return True
            except Exception as e:
                return False



