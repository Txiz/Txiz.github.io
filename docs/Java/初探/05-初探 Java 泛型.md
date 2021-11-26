**初探 Java 系列第五篇**，介绍 Java 中的泛型。

推荐先阅读初探 Java 系列的前四篇。

## **Java 中泛型的基本使用**

面向对象的一个重要目标的是对代码重用的支持。支持这个目标的一个重要的机制就是泛型机制（generic mechanism）：即如果一个功能除去对象的类型外，实现方式是相同的，那么就可以用泛型实现（generic implementation）来描述这个功能。

### Java 5 之前用继承来实现泛型程序设计

与许多程序设计语言（例如 C++，它使用模板来实现泛型编程）不同，在 Java 5 之前，Java 并不支持泛型实现，泛型的实现其实是通过使用继承的一些基本概念来完成的。

:::info
Sun 公司是在 2001 年把对泛型方法和类的直接支持作为未来的语言增强剂来宣布的，然后直到 2004 年末发表了 Java 5 并提供了对泛型方法和类的支持。
:::

使用泛型类需要理解在 Java 5 之前对泛型编程的语言特性，因此对与如何使用继承来实现泛型程序的理解是至关重要的。而在 Java 中，基本思想就是使用像 Object 这样适当的超类来实现泛型类。

```java
/*
 * 一个简单的线性表
 */
public class MyArrayList {
  
  // Object 数组用于存放线性表中的元素
  private Object[] elementData;

  // 从数组中获取元素和添加元素
  public Object get(int i) { ... }
  public void add(Object o) { ... }
}
```

上面这个简单的线性表的实现就是如何用继承来实现泛型程序设计的一个简单实例，这种是实现方式有两个最基本的问题。

:::info
注意这里的描述带了基本两个字，就是说这两个问题是最浅显容易想到的，其实这种实现方式还存在着别的问题，以后会逐一介绍到。
:::

第一个问题是：当我们试图获取一个值的时候，必须进行强制类型转换。

```java
MyArrayList list = new MyArrayList();
list.add("Hello World");
String str = (String) list.get(0);
```

第二个问题是：可以向线性表中添加不同类的对象。对于这个调用，编译和运行都不会有问题，但是如果调用 get() 方法并将结果强制转换成 String类型，就会产生错误。

```java
MyArrayList list = new MyArrayList();
list.add("Hello World");
list.add(new File("文件路径"));
```

### Java 泛型机制使用类型参数来指示元素的类型

Java 泛型机制使用类型参数（type parameters）来指示元素的类型，类型参数能够解决上述例子中出现的两个问题。

例如声明一个线性表的例子。

```java
List<String> list = new ArrayList<String>();
```

这里又出现了一个很不简洁地方：既然 list 这个对象已经是 `List<String>` 类型的对象了，那么等号右边的 ArrayList 的类型参数也必然是 String，其他类型的参数都会产生编译错误。

所以在 Java 7 之后，增加了一种新的语言特性，叫做菱形运算符 `<>`，使得代码可以进一步简化。

```java
List<String> list = new ArrayList<>();
```

### 如何定义一个简单的泛型类

一个泛型类（generic class）就是具有一个或者多个类型变量的类。

```java
public class Pair<T> {
  private T first;
  private T second;
  
  public T getFirst() { return first; }
  public T getSecond() { return second; }

  public void setFirst(T newValue) { first = newValue; }
  public void setSecond(T newValue) { second = newValue; }
}
```

Pair 类引入了一个类型 T，但其实泛型类可以有多个类型变量。

```java
public class Pair<T, U> { ... }
```

:::tip **类型描述符**
类型描述符一般是使用大写形式，而且比较短，最好是一个字母。在 Java 库中，往往使用变量 E 表示集合的元素类型，K 和 V 分别表示关键字和值的类型。T（不够的话可以用邻近的字母 U 和 S）表示任意类型。
:::

### 如何使用一个简单的泛型方法

泛型除了用来定义泛型类，还可以定义一个带有类型参数的方法。

```java
public class Generic {
  public static <T> T getMiddle(T... a){
    return a[a.length / 2];
  }
} 
```

getMiddle(T...) 这个方法是定义在一个普通类里面的，然而这是一个泛型方法，类型参数放在方法修饰符（public static）后面，返回类型的前面。

当调用一个泛型方法时，在方法名前的尖括号中放入具体的类型。

```java
String result = Generic.<String>getMiddle("A", "B", "C");
```

实际上在大多数情况下，方法调用可以省略类型参数，只要编译器有足够的信息就能够推断出所调用的方法的类型。

```java
String result = Generic.getMiddle("A", "B", "C");
```

几乎在大多数情况下，方法调用中都可以省略类型参数，也不会出现什么问题。但是也有情况下会出现错误，比如下面这个例子。

```java
String result = Generic.getMiddle(3.14, 1000, 0);
```

为什么会出错呢，因为首先编译器会把 3 个参数自动装箱成对应的包装类对象：也就是 1 个 Double 对象和 2 个 Integer 对象，然后寻找这两个类的共同的超类型。这并没有什么问题，有问题的是这两个类有两个共同的超类型：Number 和 Comparable，那么编译器将无法推断。

:::info
对于这种情况，一个比较好的解决办法就是把三个参数都写成 double 值。
:::

### 使用 extends 来限定类型变量

先来看一段代码。

```java
public class Generic {
  public static <T> T min(T[] a) {
    if (a == null || a.length == 0) return null;
    T smallest = a[0];
    for (int i = 1; i < a.length; i++) {
      if(smallest.compareTo(a[i]) > 0) smallest = a[i];
    }
    return smallest;
  }
}
```

仔细看一下这段代码，会注意到一个问题，对于随便的一个类型 T，T 类型一定会有 compareTo 方法吗？

当然这种写法下是无法保证 T 类型一定会有 compareTo 方法的，为了解决这个问题，只需要将 T 限制为实现了 Comparable 接口的类就行。可以通过对类型变量 T 设置限定实现这一点。

:::info
Comparable 接口是只含一个方法 compareTo 的标准接口。
:::

```java
public class Generic {
  public static <T extends Comparable> T min(T[] a) {
    if (a == null || a.length == 0) return null;
    T smallest = a[0];
    for (int i = 1; i < a.length; i++) {
      if(smallest.compareTo(a[i]) > 0) smallest = a[i];
    }
    return smallest;
  }
}
```

:::info
实际上这个写法并不是最好的，Comparable 接口本身就是一个泛型类型，但是现在暂时忽略其复杂性以及编译器产生的警告，往后会继续讨论如何更适当的适用类型参数。
:::

一个类型变量或通配符可以有多个限定，限定类型使用 & 分隔。

```java
public class Generic {
  public static <T extends Comparable & Serializable> T min(T[] a) { ... }
}
```

:::info
可能会存在一个疑惑，在 Java 继承相关的语法里，继承一个类用 extends，实现一个接口用 implements，那么为什么在上述示例中使用的是关键字 extends 而不是 implements？从概念上讲 `<T extends BoundingType>` 表示 T 应该是绑定类型的子类型，T 和绑定类型可以是类，也可以是接口，选择使用 extends 的原因是更加接近子类的概念。
:::

## **虚拟机没有泛型类型对象**

泛型很大程度上是 Java 语言中的成分而不是虚拟机中的结构。泛型类可以由编译器通过**类型擦除（type erasure）**转换成非泛型类。编译器会生成一种与泛型类同名的**原始类（raw class）**，但是相关的类型参数都被删去了，类型变量将由它们的类型限界来代替。

:::info
类型擦除的一个重要重要推论是，所生成的代码和在泛型之前所写的代码并没有太多的差异，而且运行的也并不快，其显著优点在于，不用将一些类型转换放到代码中，编译器将进行重要的类型检验。
:::

### 无限定的变量擦除后会用 Object 进行替换

对于无限定的变量，会直接使用 Object 进行替换，下面是刚才出现过的示例泛型类 `Pair<T>`。

```java
public class Pair<T> {
  private T first;
  private T second;
  
  public T getFirst() { return first; }
  public T getSecond() { return second; }

  public void setFirst(T newValue) { first = newValue; }
  public void setSecond(T newValue) { second = newValue; }
}
```

替换后的原始类型如下。

```java
public class Pair {
  private Object first;
  private Object second;
  
  public Object getFirst() { return first; }
  public Object getSecond() { return second; }

  public void setFirst(Object newValue) { first = newValue; }
  public void setSecond(Object newValue) { second = newValue; }
}
```

可以看到原始类其实就是一个普通的类，就好像泛型正式引入 Java 之前已经实现的那样。在程序中可以包含不同类型的 Pair，比如 `Pair<String>`，`Pair<Integer>`，类型擦除后就变成了原始的 Pair 类型了。

### 存在限定时使用第一个限定的类型变量来替换

上面已经介绍了在没有给限定的时候使用 Object 替换，比如 Pair< T >中没有显式的限定，所以原始类型使用 Object 替换掉了 T。假定声明了一个使用了限定的类型，那么就用限定的类型进行替换，如果声明的限定有多个时，就是用第一个限定的类型变量做替换。

```java
public class Interval<T extends Comparable & Serializable> implements Serializable {
  private T lower;
  private T upper;

  public Interval(T first, T second) {
    if (first.compareTo(second) <= 0) {
      lower = first;
      upper = second;
    } else {
      lower = second;
      upper = first;
    }
  }
}
```

那么被替换后的原始类型如下。

```java
public class Interval implements Serializable {
  private Comparable lower;
  private Comparable upper;

  public Interval(Comparable first, Comparable second) { ... }
}
```

:::info
现在考虑如果切换限定的顺序为：`class Interval<T extends Serializable & Comparable>`，如果这样做，原始类型将使用 Serializable 替换掉 T，编译器会在必要的时候向 Comparable 插入强制类型转换。所以为了提高效率，应该将没有方法的标签接口放在限定列表的末尾（比如 Serializable，该接口内没有需要实现的方法，仅代表实现它的类可以序列化）。
:::

### 泛型方法擦除返回类型时会插入强制类型转换

当程序调用泛型方法时，如果擦除返回类型，编译器插入强制类型转换。

```java
Pair<String> pair = new Pair<>();
pair.setFirst("Hello");
String str = pair.getFirst();
```

擦除 getFirst() 方法的返回类型后将返回 Object 类型，于是编译器将会自动插入 Employee 的强制类型转换。即第一步先调用 Pair.getFirst()，第二步将返回的 Object 类型转换为 String 类型。

### 泛型方法被擦除时使用桥方法来保持多态

看下面一段代码。一个 DateInterval 对象是一对 LocalDate 对象，需要覆盖 setSecond() 方法来确保第二个值永远不小于第一个值。

```java
public class DateInterval extends Pair<LocalDate> {
  public void setSecond(LocalDate second) {
    if (second.compareTo(getFirst()) >= 0) {
      super.setSecond(second);
    }
  }
}
```

DateInterval 类擦除后会变成如下样子。

```java
public class DateInterval extends Pair {
  public void setSecond(LocalDate second) {
    if (second.compareTo(getFirst()) >= 0) {
      super.setSecond(second);
    }
  }
  public void setSecond(Object second) {
    setSecond((Date) second);
  }
}
```

有一个让人觉得很奇怪的地方，就是多了一个 setSecond() 方法，它的参数类型是 Object。这显然是一个不同的方法，因为它的类型参并不是 LocateDate，解释这个问题之前，先考虑正常情况下应该如何使用 DateInterval 这个类。

```java
DateInterval interval = new DateInterval( ... ); // 调用某个构造函数赋值
Pair<LocalDate> pair = interval // 向上转型
pair.setSecond(aDate) // 假定之前已经有一个 LocalDate 对象 aDate
```

由于 pair 引用了一个 DateInterval 对象，所以希望调用的是 DateInterval.setSecond() 方法，它的参数类型是 LocalDate，问题在于当编译器类型擦除之后，Pair 的实际类型是 Object，于是类型擦除和多态发生了冲突，要解决这个冲突，也就是需要编译器在 DateInterval 类中生成一个**桥方法（bridge method）**，即 DateInterval 中参数类型为 Object 的 setSecond 方法。

也就是说，变量 pair 已经被声明为类型 `Pair<LocalDate>`，并且这个类型有一个简单的方法叫做 setSecond()，当类型擦除后，方法会是 setSecond(Object)。虚拟机用 pair 引用的对象调用了这个方法，这个对象是 DateInterval 类型的，因而将会调用 DateInterval.setSecond(Object) 方法（但实际上没有，只有一个setSecond(LocalDate)），所以编译器会合成一个 DateInterval.setSecond(Object) 来供我们调用。

:::info
这一块的内容，需要比较熟悉面向对象相关的知识，如果不太熟悉的话建议去看初探 Java 系列的第二篇。
:::

## **如何正确的使用 Java 泛型**

在 Java 中，类型擦除虽然使得编码得到了简化，但同样也带来的诸多限制，了解这些限制才能正确并且优雅的使用 Java 泛型。

### 运行时类型查询 instanceof 只适用于原始类型

简单来说，虚拟机中的对象总是有一个特定的非泛型类型，因此所有的类型查询只产生原始类型。

```java
if (a instanceof Pair<String>) { ... }  // 这个写法是错误的

if (a instanceof Pair<T>) { ... }  // 这个写法也是错误的
```

### 不能使用基本类型实例化类型参数

泛型不能用使用基本类型实例化类型参数，应该使用基本类型的对应的包装类。因此，没有 `Pair<double>`，只有 `Pair<Double>`。这是由于类型擦除所导致的，因为类型擦除后 Pair 类是被 Object 替换的，有限定的话会使用限定替换，而 Object 不能存储 double 值。

### 不能创建参数化类型的数组

泛型不能创建参数化类型的数组。

```java
Pair<String>[] table = new Pair<String>[10]; // 这个写法是错误的
```

因为当类型擦除后，table的类型是 Pair[]，可以把它转换成 Object[]。

然而 Java 数组会记住它的元素类型是什么，如果试图存其它的元素，就会报错，当泛型擦除后，期望数组能够继续保证元素是 Pair，但是此时数组显然无法在保证这一点（因为擦除后数组是 Object[] 了），会使这种机制无效。

在之后会介绍到通配符类型，可以声明通配类型的数组，然后进行类型转换。

```java
Pair<String>[] table = (Pair<String>[]) new Pair<?>[10];
```

这确实是一个可行的写法，但这个结果仍然不够安全，如果往 table[0] 中存入一个 `Pair<Employee>`，然后调用 table[0].getFirst()，会出现类型转换的异常（因为 getFirst() 的结果是 String，无法转成 Employee ）。

:::info
如果需要收集参数化类型对象，只有一种安全而有效的方法，就是使用：`ArrayList:ArrayList<Pair<String>>`。
:::

### 不能实例化类型变量

简单来说就是不能使用 new T()，new T[]，T.class 这样的表达式中的类型变量。

```java
// 这种写法是错误的
public Pair() {
  first = new T();
  second = new T();
}
```

解决办法是让调用者提供一个构造器表达式。

```java
public static <T> Pair<T> makePair(Supplier<T> constr) {
  return new Pair<>(constr.get(), constr.get());
}

public static void main(String[] args) {
  Pair<String> p = Pair.makePair(String::new);
}
```

:::info
makePair 方法接收一个 `Supplier<T>`，这是一个函数式接口，表示一个无参数而且返回类型为 T 的函数。
:::

### 不能构造泛型数组

既然不能实例化一个泛型实例，那自然也不能实例化数组。但是原因上有所不同，毕竟数组会填充 null 值，构造时看上去是安全的。但是由于泛型擦除，仍然会出现问题。

```java
public static <T extends Comparable> T[] minmax(T[] a) {
  T[] mm = new T[2];
  ...
}
```

在类型擦除后，方法体中的第一行代码始终会构造 Comparable[2] 数组，而这显然不是被需要的。

### A 是 B 的子类，但 `Pair<A>` 与 `Pair<B>` 没有关系

在使用泛型类时，需要了解一些有关继承和子类型的准则，假设 A 是 B 的子类，但是 `Pair<A>` 与 `Pair<B>` 没有关系。无论 A 和 B 有什么关系，往往 `Pair<A>` 和 `Pair<B>` 并没有什么关系。

<img src={require('./Image/初探Java泛型/泛型类之间的关系.jpg').default} width="500px" />

泛型类可以扩展或实现其它的泛型类，就这一点而言，与普通的类并没有什么区别。例如，`ArrayList<T>` 实现了 `List<T>`，这意味着一个 `ArrayList<Manager>` 可以转换成一个 `List<Manager>`，但是一个 `ArrayList<Manager>` 不是一个 `ArrayList<Employee>` 或者 `List<Employee>`。

## **通过通配符类型更优雅的使用泛型**

固定的泛型类型系统使用起来虽然很方便，但是却并不令人愉快，由于泛型擦除的存在，泛型所带来的方便之处能否抵消由此所引起的麻烦是一个纠缠不清的问题。所以 Java 的设计者发明了一种巧妙的并且仍是安全的解决方案：**通配符类型**。

### 通配符的子类型限定

假设 Manager 是 Employee 的子类。

通配符类型中，允许类型参数变化，`Pair<? extends Employee>` 表示一个泛型类型 Pair，它的类型参数是 Employee 的子类。

先看下面的代码。

```java
public static void printBuddies(Pair<Employee> p) {
  Employee first = p.getFirst();
  Employee second = p.getSecond();
  ...
}
```

按照这种写法，是不能将 `Pair<Manager>` 传递给这个方法的，要解决这个问题，就可以使用通配符类型。

```java
public static void printBuddies(Pair<? extends Employee> p) { ... }
```

当使用 `Pair<? extends Employee>` 时，先看下面的代码，然后仔细想一想。

```java
? extends Employee getFirst() { ... }
void setFirst(? extends Employee) { ... }
```

使用 `Pair<? extends Employee>`，其方法如上，使用 getFirst() 当然没有什么问题，将 getFirst() 的返回值赋给一个 Employee 是符合 Java 语法的。但是 setFirst() 就是无法调用的，毕竟对于方法参数，只知道需要某个 Employee 的子类型，但是却不知道具体是什么类型，它将拒绝传递任何特定的类型，毕竟 ? 不能用来匹配。

### 通配符的超类型限定

通配符限定和类型变量限定十分相似，但是通配符限定还有一个附加的能力，就是可以指定一个超类型限定，例如 `Pair<? super Manager>`。

这个通配符限制为 Manager 的所有超类型（已有的 super 关键字能够十分准确地描述这种联系，就像 extends 一样）。

```java
? super Employee getFirst() { ... }
void setFirst(? super Manager) { ... }
```

还是上面这段代码，此时情况又不同了，使用 `Pair<? super Manager>` 时，无法知道 setFirst() 方法的具体类型，因此调用 setFirst() 这个方法时不能接受类型为 Employee 或 Object 的参数，只能传递 Manager 类型的对象，或者某个子类型对象。

:::info
注意这里有一点绕，`Pair<? super Manager>` 可以匹配 `Pair<Employee>` 和 `Pair<Object>`，但是 Pair.setFirst() 方法的参数只能接受 Manager 以及其子类型。这里需要非常清楚的理解**多态中向上转型**部分的知识点。
:::

然后是调用 getFirst() 方法，不能保证返回对象的类型，只能将它赋给一个 Object。

```java
public static void minmaxBonus(Manager[] a, Pair<? super Manager> pair) {
  if (a.length == 0) return;
  Manager min = a[0];
  Manager max = a[0];
  for(int i=1; i<a.length; i++) {
    if(min.getBonus() > a[i].getBonus()) min = a[i];
    if(max.getBonus() < a[i].getBonus()) max = a[i];
  }
  result.setFirst(min);
  result.setSecond(max);
}
```

:::info
直观的讲，带有超类型类型的通配符可以向泛型对象写入，带有子类型限定的通配符可以从泛型对象读取。
:::

### 无限定通配符

事实上，还可以使用无限定的通配符，例如：`Pair<?>`，初看起来，好像和原始的 Pair 是一样的，但是实际上有很大的不同。

```java
? getFirst() { ... }
void setFirst(?) { ... }
```
getFirst() 的返回值只能被赋值给一个 Object，setFirst() 方法则不能被调用，甚至不能用 Object 调用。Pair<?> 和 Pair 的本质不同在于：**可以用任意 Object 对象调用原始 Pair 的 setFirst() 方法**。之所以要使用这样看上去毫无意义的类型，是因为它对于很多简单的操作都很有用，比如下面的这段代码。

```java
public static boolean hasNulls(Pair<?> p) {
  return p.getFirst() == null || p.getSecond() == null;
}
```
可以使用上面的方法来测试一个 pair 是否包含一个 null 引用，它并不需要实际的类型。